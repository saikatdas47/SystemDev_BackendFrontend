const User = require('../models/user');

async function handleGetAllUsers(req, res) {
    const allUsers = await User.find();
    return res.status(200).send(allUsers);
}

async function handleGetUserById(req, res) {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send(user);
}

async function handleDeleteUserById(req, res) {
    const userId = req.params.id;
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
        return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "User deleted successfully" });
}

async function handleUpdateUserById(req, res) {
    try {
        const userId = req.params.id;

        const result = await User.findByIdAndUpdate(
            userId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }

        return res.status(200).send({
            message: "User updated successfully",
            user: result
        });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).send({
                message: "Email already exists"
            });
        }

        return res.status(500).send({
            message: "Internal server error"
        });
    }
}

async function handleCreateNewUser(req, res) {
    const body = req.body;

    if (!body || !body.firstName || !body.lastName || !body.email || !body.jobTitle || !body.gender) {
        return res.status(400).send({ message: "All fields are required" });
    }

    const result = await User.create(body);
    return res.status(201).send({ message: "User added successfully", id: result._id });
}



module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById,
    handleCreateNewUser,
};