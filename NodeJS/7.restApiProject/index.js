const express = require('express');
const app = express();
const port = 3000;
const users = require('./MOCK_DATA.json');

const fs = require('fs');
//middlewaare plaggin to parse JSON bodies in requests  pore bhujbo ata ki 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route
app.get('/', (req, res) => {
    res.send('Hello World! This is my first REST API using Express.js');
});
app.get('/users', (req, res) => {
    const html = `<html>
   <head>
   <title>Users</title>
   </head>
   <body>
   <h1>List of Users</h1>
   <ul>
   ${users.map(user => `<li>${user.first_name} ${user.last_name} - ${user.email}</li>`).join('')}
   </ul>
   </body>
   </html>`;
    res.send(html);
});

app.get('/home', (req, res) => {
    res.send('Hello World! HOME');
});



//                      rest api to get users data in json format

app.get('/api/users', (req, res) => {
    res.json(users);
});
app.get('/api/users/:idd', (req, res) => {
    const userId = parseInt(req.params.idd); // Convert id from string to integer
    const user = users.find(u => u.id === userId); // Find user by id in Mock_data.json er array data[jekhane onek alada object ache] theke u.id akta object nibe 
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
app.post('/api/users', (req, res) => {
    const body = req.query; //body parser diyeo kora jay. eta express er built in middleware
    console.log('Request Body:', body);
    const newUser = {
        id: users.length + 1,
        ...body
    };
   
    users.push(newUser); //MOCK_DATA.json e add korbe na. server restart korle data chole jabe karon eta in-memory array
    
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => { 
        if (err) { console.log(err); } 
        else { console.log("Data written successfully"); } 
    }); //file e write korar jonno

    res.status(201).json({ message: 'User created successfully', id: newUser.id  });
});




app.put('/api/users/:idd', (req, res) => {
    const userId = parseInt(req.params.idd);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    const body = req.query;
    users[userIndex] = { ...users[userIndex], ...body };
    
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), err => {
        if (err) console.log(err);
        else{
            res.json({ message: `User with id ${userId} updated successfully` });
        }
    });
});






app.patch('/api/users/:idd', (req, res) => {
    //TODO: Partially update user logic here
    res.json({ message: `User with id ${req.params.idd} partially updated successfully` });
});
app.delete('/api/users/:idd', (req, res) => {
    //TODO: Delete user logic here
    res.json({ message: `User with id ${req.params.idd} deleted successfully` });
});


//same route /api/users/:idd with different http methods (GET, PUT, PATCH, DELETE) diye alada alada kaj kora jay
//  app.route('/api/users/:idd')
//     .get((req, res) => {
//         const userId = parseInt(req.params.idd);
//         const user = users.find(u => u.id === userId);
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     })
//     .put((req, res) => { })
//     .patch((req, res) => { })
//     .delete((req, res) => { });






//server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});