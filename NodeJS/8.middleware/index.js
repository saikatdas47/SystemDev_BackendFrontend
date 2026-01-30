const express = require('express');
const app = express();
const port = 3000;
const users = require('./MOCK_DATA.json');

const fs = require('fs');

//middlewaare plaggin to parse JSON bodies in requests  pore bhujbo ata ki 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => { 
    console.log('Hello From middleware 1'); //aikhane chaile req change kora jay , sei changed req object pore route / middleware e jabe 
    req.username = 'Saikat Das';
    next();
    
});
app.use((req, res, next) => { // ei middleware a date time method log kora hoyeche
    console.log('Hello From middleware 2',req.username);
    fs.appendFile('log.txt', `Request made to: ${new Date().toISOString()} - ${req.method} -  ${req.url}\n`, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        }
    });
    next();
    
});

//route
app.get('/api/users', (req, res) => {
    console.log(req.headers); //request er headers gula console e dekhanor jonno
    res.setHeader('X-My-Header', 'Moon'); //custom header set kora holo jekhane x prefix daoya good practice ja client responce e dekhbe
    res.json(users);
});

app.post('/api/users', (req, res) => {

  });




//server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});