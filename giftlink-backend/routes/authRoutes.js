//Step 1 - Task 2: Import necessary packages
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino');
const { body, validationResult } = require('express-validator');

//Step 1 - Task 3: Create a Pino logger instance
const logger = pino();

dotenv.config();

//Step 1 - Task 4: Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not defined in environment variables");
}

router.post('/register', async (req, res) => {
    //Step 2
    try {

        const db = await connectToDatabase();
        const collection = db.collection("users");
        const checkEmail = await collection.findOne({ email: req.body.email })

        if (checkEmail) {
            logger.error("Email already exists");
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const email = req.body.email;

        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        })

        const payload = {
            user: {
                id: newUser.insertedId
            },
        };

        const token = jwt.sign(payload, JWT_SECRET);

        logger.info("Registered Successfully");
        return res.json({ token, email });
    } catch (e) {
        logger.error("Register failed: ", e)
        return res.status(500).send("Internal server error")
    }
});

router.post('/login', async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`.
        const db = await connectToDatabase();

        // Task 2: Access MongoDB `users` collection
        const collection = db.collection("users");

        // Task 3: Check for user credentials in database
        const user = await collection.findOne({ email: req.body.email });

        if (!user) {
            // Task 7: Send appropriate message if user not found
            logger.error("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        // Task 4: Check if the password matches the encrypted password
        const passwordMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!passwordMatch) {
            logger.error("Wrong password");
            return res.status(401).json({ message: "Wrong password" });
        }

        // Task 5: Fetch user details from database
        const userName = user.firstName;
        const userEmail = user.email;

        // Task 6: Create JWT authentication if passwords match with user._id as payload
        const payload = {
            user: { id: user._id.toString() }
        };
        const token = jwt.sign(payload, JWT_SECRET);

        logger.info("Successfully logged in");

        return res.status(200).json({
            token,
            userName,
            userEmail
        });

    } catch (e) {
        logger.error("Login failed: ", e);
        return res.status(500).send('Internal server error');
    }
});

// {Insert it along with other imports} Task 1: Use the `body`,`validationResult` from `express-validator` for input validation


router.put('/update', [
    body('firstName').optional().isString().withMessage('First name must be a string'),
    body('lastName').optional().isString().withMessage('Last name must be a string'),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    // Task 2: Validate the input using `validationResult` and return approiate message if there is an error.


    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
        // Task 3: Check if `email` is present in the header and throw an appropriate error message if not present.
        const email = req.header("email");

        if (!email) {
            return res.status(400).json({ message: "Email header is required" })
        }


        // Task 4: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 5: find user credentials in database
        const collection = db.collection("users")
        const existingUser = await collection.findOne({ email })

        if (!existingUser) {
            logger.error("user not found")
            return res.status(404).json({ message: "User not found" })
        }

        // Task 6: update user credentials in database
        existingUser.firstName = req.body.name;
        existingUser.updatedAt = new Date();

        const updatedUser = await collection.findOneAndUpdate(
            { email },
            { $set: existingUser },
            { returnDocument: 'after' } 
          );

          if (!updatedUser) {
            logger.error(`Update failed: Could not update user - ${email}`);
            return res.status(500).json({ message: "Failed to update user" });
          }

        // Task 7: create JWT authentication using secret key from .env file
        const payload = { user: { id: updatedUser._id.toString() } }
        const token = jwt.sign(payload, JWT_SECRET)
        logger.info("User updated successfully")
        return res.json({ token, email });

    } catch (e) {
        logger.error("Update failed: ", e.message)
        console.log(e)
        return res.status(500).send('Internal server error');

    }
});


module.exports = router;