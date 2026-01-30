const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUsersOnly,checkAuthenticationStatus}=require('./middlewires/auth')




const app = express();
const PORT = 3000;
url = 'mongodb://127.0.0.1:27017/shorturl';
const { connectToMongoDB } = require('./connect');
connectToMongoDB(url).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));//ata na dile body underfined asbe
app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));



const urlRoutes = require('./routes/url');
app.use('/url',restrictToLoggedInUsersOnly, urlRoutes); //inline middleware use korlam jehetu ei route e login user ra jabe
const staticRouter = require('./routes/staticRouter');
app.use('/', checkAuthenticationStatus,staticRouter);
const userRouter = require('./routes/user');
app.use('/user', userRouter);



app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`); });