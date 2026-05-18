import express from "express";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import bcrypt from "bcrypt";
import { validateEmail, validateName, validatePassword } from "../utils/validations.mjs";

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