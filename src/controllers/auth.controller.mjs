import express from "express";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import bcrypt from "bcrypt";

// TODO: controller to authenticate user and send a JSON web token as response
async function loginController(req, res) {

}

// TODO: controller to register a user and send the JWT token as response
async function registerController(req, res) {

}

// TODO: controller for generating new refresh token evry time the JWT expires
async function refreshController(req, res) {

}

export {
    loginController,
    registerController,
    refreshController,
}