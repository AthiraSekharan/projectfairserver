const jwt = require('jsonwebtoken')
const users = require('../Models/userModel')
//register 
exports.register = async (req, res) => {
    console.log("inside register request");
    const { username, email, password } = req.body
    console.log(username, email, password);


    try {
        // Check email is present db or not
        const existingUser = await users.findOne({ email })
        // If email is present then existing user
        if (existingUser) {
            res.status(406).json("User already exists!!!")
        } else {
            // Else store / insert data to db
            const newUser = new users({
                username, email, password, github: "", linkedin: "", profile: ""
            })
            // To store data to mongodb from mongoose model
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}
//login
exports.login = async (req, res) => {
    console.log("INSIDE LOGIN FUNCTION");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            //generate token
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET)
            res.status(200).json({
                existingUser,
                token
            })

        } else {
            res.status(404).json("invalid email / password")

        }

    } catch (err) {
        res.status(401).json(err)

    }
}

//update profile
exports.editUser = async (req, res) => {
    console.log("edit user");
    const userId = req.payload
    const { username, email, password, github, linkedin, profileImage } = req.body
    const profile = req.file ? req.file.filename : profileImage
    try {
        const updateUser = await users.findByIdAndUpdate({ _id: userId }, { username, email, password, github, linkedin, profile }, { new: true })
        console.log(updateUser);
        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(401).json(err)
    }
}