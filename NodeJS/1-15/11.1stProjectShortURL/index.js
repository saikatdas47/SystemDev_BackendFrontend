const express = require('express');

const app = express();
const PORT = 3000;
url = 'mongodb://127.0.0.1:27017/shorturl';
const { connectToMongoDB } = require('./connect');
connectToMongoDB(url);

app.use(express.urlencoded({ extended: true }));//ata na dile body underfined asbe
app.use(express.json());


const urlRoutes = require('./routes/url');

app.use('/shorturl', urlRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
