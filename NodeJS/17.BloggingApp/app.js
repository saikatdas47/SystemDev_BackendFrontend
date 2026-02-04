require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const PORT = process.env.PORT || 3000;

//mongoose.connect('mongodb://127.0.0.1:27017/blogapp').then(() => {
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});


app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve("./public")));


app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));


const Blog = require('./models/blog');
app.get('/', async (req, res) => {
    try {
        const posts = await Blog.find({})
            .sort({ createdAt: -1 }) // latest first
            .populate('createdBy', 'username profilePicUrl');

        res.render('home', {
            user: req.user,
            posts,
            title: 'Blog Home'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading feed');
    }
});

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

const blogRoutes = require('./routes/blog');
app.use('/blog', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
