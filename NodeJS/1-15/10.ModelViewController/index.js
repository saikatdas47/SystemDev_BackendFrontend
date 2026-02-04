const express = require('express');
const app = express();
const port = 3000;



dbURL='mongodb://127.0.0.1:27017/DataBaseName';
const userRoute = require('./routes/user');
const {logReqRes}=require('./middlewares/index');
const {connectMongoDB}=require("./connection"); //connectMongoDB function na connection.js theke nise cz export kora hyse oikhan theke func ta 



connectMongoDB(dbURL).then(()=>{
    console.log("MongoDB connected successfully")}
);




//middleware
app.use(express.urlencoded({ extended: true }));//ata na dile body underfined asbe
app.use(logReqRes('log.txt'));


app.use('/api/users', userRoute); //route use korlam

 





app.listen(port, () => {
    console.log(`MongoDB connection module running at http://localhost:${port}`);
});
