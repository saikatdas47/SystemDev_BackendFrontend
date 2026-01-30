const express = require('express');

const {handleGetAllUsers,handleGetUserById,handleDeleteUserById,handleUpdateUserById,handleCreateNewUser} = require('../controllers/user');

const router = express.Router();

router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)



router.route('/:id')
    .get(handleGetUserById)
    .delete(handleDeleteUserById)
    .patch(handleUpdateUserById);



module.exports =  router; //ata aivabe {} pathano hoy nai karon aata function na ata holo router object tai direct export kora hyse
