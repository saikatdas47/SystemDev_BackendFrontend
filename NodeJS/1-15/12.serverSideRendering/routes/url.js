const express = require('express');
const router = express.Router();

const { createShortUrl, redirectUrl,analyzeUrlVisits} = require('../controllers/url');

// Route to create a new short URL
router.post('/', createShortUrl);


// Route to redirect to the original URL and log the visit
router.get('/:id', redirectUrl);
router.get('/analyze/:id', analyzeUrlVisits);

module.exports = router;