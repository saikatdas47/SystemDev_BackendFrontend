const exress = require('express');
const router = exress.Router();

const User = require('../models/user');
const Blog = require('../models/blog');

router.get('/signin', (req, res) => {
    return res.render('signin');
});
router.get('/signup', (req, res) => {
    return res.render('signup');
});


router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.render('signup', { error: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render('signup', { error: 'User with this email already exists' });
    }
    await User.create({ username, email, password });
    return res.redirect('/user/signin');
}
);

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await User.matchedPasswordANDGenerateToken(email, password);
        if (!token) {
            return res.status(401).send('Invalid credentials');
        }
        //console.log('User signed in:', token);
        return res.cookie('token', token, { httpOnly: true }).redirect('/');
    }
    catch (err) {
        return res.render('signin', { error: err.message });
    }
});
router.post('/signout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/');
});

router.get('/profile', async (req, res) => {
    let posts = [];

    if (req.user) {
        posts = await Blog.find({ createdBy: req.user.id })
            .sort({ createdAt: -1 })
            .populate('createdBy', 'username profilePicUrl');
    }
//console.log('User profile accessed:', req.user, posts);
    return res.render('profile', { user: req.user, posts });
});

module.exports = router;