import express from "express";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import bcrypt from "bcrypt";
import { validateEmail, validateName, validatePassword } from "../utils/validations.mjs";
import User from "./../models/User.mjs";

// TODO: controller to authenticate user and send a JSON web token as response
async function loginController(req, res) {

}

// TODO: controller to register a user and send the JWT token as response
async function registerController(req, res) {
    try {
        const { email, name, password } = res.body;

        const correctName = validateName(name);
        const correctEmail = validateEmail(email);
        const validatePassword = validatePassword(pass);

        const user = await User.findOne({ email: correctEmail });
        if (user) {
            return res.status(200).json({
                status: "failed",
                messages: "User with this email already exist",
                data: {}
            })
        }

        // If user don't exist then hash the password and store the user data.
        const hashPass = await bcrypt.hash(validatePassword, 12);

        const newUser = User.create({
            name: correctName,
            email: correctEmail,
            password: hashPass,

        })

        await newUser.save();

        return res.status(201).json({
            status: "success",
            messages: "User registration successful",
            data: {
                _id, name, email
            } = newUser
        });
        
    } catch (err) {
        console.log("ERROR: registring user \n", err);
        return res.status(500).json({
            status: "failed",
            messages: "Internal server error",
            data: {}
        })
    }
}

// TODO: controller for generating new refresh token evry time the JWT expires
async function refreshController(req, res) {

}

export {
    loginController,
    registerController,
    refreshController,
}