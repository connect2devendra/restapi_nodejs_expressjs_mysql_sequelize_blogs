const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const models = require("../models");
const User = models.User;

const getUsers = async(req, res) =>{
    try {
        const userInfos = await User.findAll({});
        console.log(userInfos);
        res.json({
            success: true,
            message: "User List",
            users: userInfos
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "User not found!"
        });
    }
}

const getUser = async(req, res) =>{
    try {
        const id = req.params.id;
        const userInfo = await User.findAll({where:{id:id}});
        console.log(userInfo);
        res.json({
            success: true,
            message: "User Details",
            user: userInfo
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "User not found!"
        });
    }
}

const createUser = async(req, res) =>{

        const body = req.body;

        if (!(body.email && body.password)) {
            return res.status(400).send({
                success: false,
                message: "Data not formatted properly"
            });
        }

        const userInfo = new User(body);

        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        userInfo.password = await bcrypt.hash(userInfo.password, salt);  

        userInfo.save()
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "User created successfully",
                user: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Failed to create new user!"
            });
        });
}

const updateUser = async(req, res) =>{

        const id = req.params.id;
        // const userInfo = await User.update(req.body, {where:{id}});
        const {firstName, lastName, mobile, email, gender} = req.body;

        const userInfo = await User.findOne({where:{id}});

        userInfo.firstName = firstName;
        userInfo.lastName = lastName;
        userInfo.mobile = mobile;
        userInfo.email = email;
        userInfo.gender = gender;

        userInfo.save()
        .then((result) => {
            res.status(200).json({
                success: true,
                message: "User details updated successfully!"
            });
        })
        .catch((err) => {
            res.status(400).json({
                success: false,
                message: "Failed to update!"
            })
        });       
}

const deleteUser = async(req, res) =>{
    try {

        const id = req.params.id;
        const userInfo = await User.destroy({where:{id}});
        res.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Failed to delete existing user!"
        });
    }
}

const loginUser = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({where:{ email: body.email }});
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {

        const jwt_secret_key = process.env.JWT_SECRET || 'connect2devendra';
        
        const jwt_token = jwt.sign({data:{ id: user.id, email: user.email }}, jwt_secret_key, {
            expiresIn: '2m' // expires in 5 minutes
          });

        res.status(200).json({
             success: true,
             token: jwt_token,
             message: "You have login successfully!" 
            });
      } else {
        res.status(400).json({ 
            success: false,
            token: null,
            message: "Invalid credentials"
         });
      }
    } else {
      res.status(401).json({
           success: false,
           token: null,
           message: "User does not exist"
         });
    }
  }

module.exports = {getUsers, getUser, createUser, updateUser, deleteUser, loginUser };
