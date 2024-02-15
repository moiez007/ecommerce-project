//ALL OF THE BACKEND CODE GOES HERE
//for the dependencies in pkg.json we used this command: npm add body-parser express mongoose jsonwebtoken nodemailer nodemon cors
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

mongoose
    .connect("mongodb+srv://syedmoiezhaider:bscs15071@cluster0.hjpo4qn.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to mongoose");
    }).catch((err) => {
        console.log("Error connecting to MongoDB", err);

    })

app.listen(port, () => {
    console.log("server is running @ port",port)
})

//endpoint to register in the app
const Orders = require("./modals/orders");
const User = require("./modals/user")

//Function to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
    //create a nodemailer transport
    const transporter = nodemailer.createTransport({
        //configure the email service
        service: "gmail",
        auth: {
            user: "syedmoiezhaider@gmail.com",
            pass: "nflm ahmn vdjz ombj",

        }
    })
    //compose the email message
    const mailOptions = {
        from: "amazon.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,

    };

    //send the email
    try {
        await transporter.sendMail(mailOptions)
    }
    catch (err) {
        console.log("Error sending verification email", err)
    }
}

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        //Create a new usuer if he is not registerd
        const newUser = new User({ name, email, password })
        //now generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex")

        //save user to the database
        await newUser.save();

        //after saving, now send verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken)
    } catch (error) {

        console.log("Error, ", error);
        res.send(500).json({ message: "Registration Failed" })
    }

})

//Endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;
        //find user with the given verification token
        const user = await User.findOne({ verificationToken: token })
        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" })
        }

        // if user is found we shall mark him verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Email verified successfully!" })

    } catch (error) {
        res.status(500).json({ message: "Email verificatoin failed" })
    }
})