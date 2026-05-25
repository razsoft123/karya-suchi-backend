import express from "express";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import bcrypt from "bcrypt";
import { validateEmail, validateName, validatePassword } from "../utils/validations.mjs";
import User from "./../models/User.mjs";

// TODO: controller to authenticate user and send a JSON web token as response
async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        const correctEmail = validateEmail(email);

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                status: "failed",
                data: {},
                messages: ["No, user found with this email"]
            })
        }

        // If user found varify the password
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(401).json({
                status: "failed",
                data: {},
                messages: ["Email id or password is incorrect"]
            })
        }

        // Create a JWT token and refresh token and 
        const token = await jwt.sign(JSON.stringify({ id: user._id }), process.env.JWT_SECRET);
        const refreshToken = await jwt.sign(JSON.stringify({ id: user._id }), process.env.JWT_REFRESH_SECRET);

        res.set('jwt-token', token);
        res.set('refresh-token', refreshToken);

        return res.status(200).json({
            status: "success",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            messages: ["user login successful"]
        })

    } catch (err) {
        console.log("ERROR: Error in loggin user: ", err);
        return res.status(500).json({
            status: "failed",
            data: {},
            messages: ["Error while logging user"]
        })
    }
}

// TODO: controller to implement the logout of the user
async function logoutController(req, res) {
    const jwtToken = req.header('jwt-token');
    try {
        const result = await jwt.verify(jwtToken, process.env.JWT_SECRET);
        res.set('jwt-token', null)
        res.set('refresh-token', null)

        if (!result) {
            return res.status(400).json({
                status: "failed",
                data: {},
                messages: ["Can't varify the token "]
            })
        }

        return res.status(204).json({
            status: "success",
            data: {},
            messages: ["Logout successful"]
        })
    } catch (err) {
        console.log("ERROR: JWT not varified ", err);
        return res.status(500).json({
            status: "failed",
            data: {},
            messages: ["Logout failed"]
        })
    }
    const result = jwt.verify(jwtToken, process.env.JWT_SECRET);
}

// TODO: controller to register a user and send the JWT token as response
async function registerController(req, res) {
    try {
        const { email, name, password } = req.body;

        const correctName = validateName(name);
        const correctEmail = validateEmail(email);
        const validatedPassword = validatePassword(password);

        const user = await User.findOne({ email: correctEmail });
        if (user) {
            return res.status(400).json({
                status: "failed",
                messages: "User with this email already exist",
                data: {}
            })
        }

        // If user don't exist then hash the password and store the user data.
        const hashPass = await bcrypt.hash(validatedPassword, 12);

        const newUser = await User.create({
            name: correctName,
            email: correctEmail,
            password: hashPass,

        })

        await newUser.save();

        // Send the new JWT token and new refresh token in as the http header cookies
        const token = await jwt.sign(JSON.stringify({ id: newUser._id }), process.env.JWT_SECRET);
        const refreshToken = await jwt.sign(JSON.stringify({ id: newUser._id }), process.env.JWT_REFRESH_SECRET);

        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.set('jwt-token', token);
        res.set('refresh-token', refreshToken);

        return res.status(201).json({
            status: "success",
            messages: "User registration successful",
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (err) {
        console.log("ERROR: registering user \n", err);
        return res.status(500).json({
            status: "failed",
            messages: ["Internal server error"],
            data: {}
        })
    }
}

// TODO: controller for generating new refresh token evry time the JWT expires
async function refreshController(req, res) {
    const token = req.header('jwt-token');
    const refreshToken = req.header('refresh-token');

    try {
        try {
            const result = jwt.verify(token, process.env.JWT_SECRET);
        } catch (TokenExpiredError) {
            { name, messages } = TokenExpiredError;
            if (name === 'TokenExpiredError') {
                try {
                    const resultRef = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                } catch (TokenExpiredErrorRef) {
                    res.set('jwt-token', null);
                    res.set('refresh-toke', null);

                    return res.status(400).json({
                        status: 'failed',
                        data: {},
                        messages: ["JWT and Referesh both token is expired", "Preceding to logout"];
                    })
                }
            }
        }
    } catch (err) {
        console.log("ERROR: failed in refresh token ", err);
        return res.status(500).json({
            status: "failed",
            messages: ["Internal server error"],
            data: {}
        })
    }
}



export {
    loginController,
    logoutController,
    registerController,
    refreshController,
}