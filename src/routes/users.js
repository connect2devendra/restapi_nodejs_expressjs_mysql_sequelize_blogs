const express = require("express");
const {getUsers, getUser, createUser, updateUser, deleteUser, loginUser} = require("../controllers/Users");
const {authenticateJWT} = require("../middlewares/auth");
const route = express.Router();


route.get('/', getUsers);
route.post('/', createUser);
route.get('/:id', [authenticateJWT], getUser);
route.patch('/:id', [authenticateJWT], updateUser);
route.delete('/:id', [authenticateJWT], deleteUser);

// login route
route.post("/login", loginUser);

module.exports = route;