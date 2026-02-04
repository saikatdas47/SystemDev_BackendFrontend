const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const Blog = require('../models/blog');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!req.user) return cb(new Error('User not signed in'));
        const dir = path.join(__dirname, `../public/${req.user.id}/postImg`);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.post('/create', upload.single('uploadedFile'), async (req, res) => {
    if (!req.user) return res.status(401).send('You must be signed in');

    const { title, content, imgUrl } = req.body;
    if (!title || !content) return res.status(400).send('Title and content are required');

    let finalImgUrl = imgUrl || '';
    if (req.file) finalImgUrl = `/${req.user.id}/postImg/${req.file.filename}`;

    try {
        await Blog.create({
            title,
            content,
            imgUrl: finalImgUrl,
            createdBy: new mongoose.Types.ObjectId(req.user.id) // ✅ Use 'new' here
        });
        return res.redirect('/user/profile');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error creating blog post: ' + err.message);
    }
});

// DELETE POST
router.post('/delete/:id', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const post = await Blog.findById(req.params.id);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Only owner can delete
        if (post.createdBy.toString() !== req.user.id) {
            return res.status(403).send('Not allowed');
        }

        // 🧹 Optional: delete image file
        if (post.imgUrl) {
            const imgPath = path.join(__dirname, '../public', post.imgUrl);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }

        await post.deleteOne();
        return res.redirect('/user/profile');

    } catch (err) {
        console.error(err);
        return res.status(500).send('Error deleting post');
    }
});
router.get('/:id', async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id)
            .populate('createdBy', 'username profilePicUrl');

        if (!post) {
            return res.status(404).send('Post not found');
        }

        const comments = await Comment.find({ blog: post._id })
            .populate('createdBy', 'username profilePicUrl')
            .sort({ createdAt: -1 });

        res.render('post', {
            user: req.user,
            post,
            comments,
            title: post.title
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading post');
    }
});

const Comment = require('../models/comment');

router.post('/comment/:id', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('You must be signed in to comment');
    }

    const { content } = req.body;
    if (!content.trim()) {
        return res.status(400).send('Comment cannot be empty');
    }

    try {
        const post = await Blog.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        await Comment.create({
            content,
            blog: post._id,
            createdBy: new mongoose.Types.ObjectId(req.user.id)
        });

        return res.redirect(`/blog/${req.params.id}`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error adding comment');
    }
});

router.post('/comment/delete/:id', async (req, res) => {
    if (!req.user) return res.status(401).send('Unauthorized');

    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).send('Comment not found');

        // Find the related post to check post owner
        const post = await Blog.findById(comment.blog);
        if (!post) return res.status(404).send('Post not found');

        // Only comment owner or post owner can delete
        if (comment.createdBy.toString() !== req.user.id && post.createdBy.toString() !== req.user.id) {
            return res.status(403).send('Not allowed');
        }

        await comment.deleteOne();
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error deleting comment');
    }
});

module.exports = router;