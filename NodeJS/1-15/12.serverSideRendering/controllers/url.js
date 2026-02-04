const Url = require('../models/url');
const shortID = require('shortid');


async function createShortUrl(req, res) {
    const { originalUrl } = req.body;
    const shortUrl = shortID();

    try {
      
        const newUrl = new Url({ originalUrl, shortUrl, visitHistory: [] });
        await newUrl.save();
        //same kaj ta eivae kora jay
        // await Url.create({
        //     originalUrl,
        //     shortUrl,
        //     visitHistory: []
        // });

        // go back to home so EJS re-renders
        //return res.redirect('/');
        return res.render('home', { shortUrl:shortUrl});
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error creating short URL');
    }
}

async function redirectUrl(req, res) {
    const shortUrl = req.params.id;
    console.log(shortUrl);

    const entry = await Url.findOneAndUpdate(
        { shortUrl },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );

    if (entry) {
        return res.redirect(entry.originalUrl);
    } else {
        return res.status(404).json({ error: 'Short URL not found' });
    }


}
async function analyzeUrlVisits(req, res) {
    const shortUrl = req.params.id;

    try {
        const entry = await Url.findOne({ shortUrl });
        if (entry) {
            const visitData = entry.visitHistory.map(visit => ({
                timestamp: visit.timestamp,
                date: new Date(visit.timestamp).toLocaleString()
            }));
            res.status(200).json({ shortUrl, visitData });
        } else {
            res.status(404).json({ error: 'Short URL not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving visit data' });
    }
}

module.exports = { createShortUrl, redirectUrl, analyzeUrlVisits };