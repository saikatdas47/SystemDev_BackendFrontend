const express = require('express');
const Url = require('../models/url');
const { restrictTo } = require('../middlewires/auth');
const router = express.Router();





router.get('/',restrictTo(["NormalUser","Admin"]), async (req, res) => {
  
    const userUrls = await Url.find({
        createdBy: req.user._id
    }).lean();  //used lean karon EJS er jonno plain object dorkar , plane object bolte mongoose er document na

    res.render('home', {
        urls: userUrls
    });
});


router.get('/admin',restrictTo(["Admin"]), async (req, res) => {
    const allUrls = await Url.find();
    res.render('admin', {
        urls: allUrls,
    });
});


router.get('/signup', (req, res) => {
    res.render('signUp');
});
router.get('/login', (req, res) => {
    res.render('login');
});


module.exports = router;
