require("dotenv").config();
const User = require("../models/user.model");
const jwt  = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let newUser = await User.findOne({ email })

        if (newUser) {
            return res.status(400).json({ err: "User already exists!" });
        }

        const hashpassword = await bcrypt.hash(password, 10);
        newUser = new User({ name, email, password: hashpassword, role });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "Registered successfully", savedUser })
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ err: "User not found!" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ err: "Password is wrong!" })
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
        
        res.json({ token, message: "Logged in successfully!", userRole: user.role })
    } catch (err) {
        return res.status(400).send(err);
    }
};
