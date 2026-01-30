const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
url = 'mongodb://127.0.0.1:27017/shorturl';
const { connectToMongoDB } = require('./connect');
connectToMongoDB(url);

app.use(express.urlencoded({ extended: true }));//ata na dile body underfined asbe
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


const urlRoutes = require('./routes/url');
app.use('/url', urlRoutes);


const staticRouter = require('./routes/staticRouter');
app.use('/', staticRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
