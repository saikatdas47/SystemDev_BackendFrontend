const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

//MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/DataBaseName')
    .then(() => { console.log("Mongodb Connected") })
    .catch((err) => { console.log("Error connecting to MongoDB : ", err) });


//Schema definition
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    jobTitle: { type: String },
    gender: { type: String }
},
    {
        timestamps: true
    });
//schema banano shes akhon schema theke model banabo
const User = mongoose.model('user', userSchema); //aikhane 'user' holo collection name jeta mongodb te create hobe , collection holo jekhane document gula store thakbe , document holo record



//middleware
app.use(express.urlencoded({ extended: true }));//ata na dile body underfined asbe



app.route('/api/users')
    .post(async (req, res) => { //async function because mongoose operations are asynchronous why we use async await because we want to wait for the operation to complete before sending a response
        const body = req.body;
        console.log("Request Body : ", body);

        if (!body || !body.firstName || !body.lastName || !body.email || !body.jobTitle || !body.gender) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const result = await User.create({ //crud oparation - create
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            jobTitle: body.jobTitle,
            gender: body.gender
        });

        console.log("User added : ", result);
        return res.status(201).send({ message: "User added successfully" });

    })

    .get(async (req, res) => { //ata json format e data dekhabe best practice react flutter er jonno
        const users = await User.find(); //crud operation - read
        return res.status(200).send(users);
    });




app.get('/users', async (req, res) => { //ata html format e data dekhabe 
    const users = await User.find(); //crud operation - read
    const html = `<html>
      <head>
      <title>Users</title>
      </head>
      <body>
      <h1>List of Users</h1>
      <ul>
      ${users.map(user => `<li>${user.firstName} ${user.lastName} - ${user.email} - ${user.jobTitle} - ${user.gender}</li>`).join('')}
      </ul>
      </body>
      </html>`;
    res.send(html);

});



app.route('/api/users/:id')
    .get(async (req, res) => {
        const userId = req.params.id;
        const user = await User.findById(userId); //crud operation - read
        if (user) {
            return res.status(200).send(user);
        } else {
            return res.status(404).send({ message: "User not found" });
        }
    })
    .delete(async (req, res) => {
        const userId = req.params.id;
        const result = await User.findByIdAndDelete(userId); //crud operation - delete
        if (result) {
            return res.status(200).send({ message: "User deleted successfully" });
        } else {
            return res.status(404).send({ message: "User not found" });
        }
    }).patch(async (req, res) => {
        const userId = req.params.id;
        const body = req.body;
        const result = await User.findByIdAndUpdate(userId, body, { new: true }); //crud operation - update
        if (result) {
            return res.status(200).send({ message: "User updated successfully", user: result });
        } else {
            return res.status(404).send({ message: "User not found" });
        }
    });



app.listen(port, () => {
    console.log(`MongoDB connection module running at http://localhost:${port}`);
});
