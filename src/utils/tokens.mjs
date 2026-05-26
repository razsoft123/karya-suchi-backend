// Utility function to generate the new JWT Token and Refresh Token
import jwt from "jsonwebtoken";

// add system to generate new access token
function generateAccessToken(payload) {

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMEOUT })
    return jwtToken;

}

// add system to genreate new refresh token
function generateRefreshToken(payload) {

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_TIMEOUT })
    return refreshToken;

}

// add system to new token in response object http only cookies
function setNewTokens(res, jwtToken, refreshToken) {

    const baseCookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict'
    }

    res.cookie("accessToken", jwtToken, {
        ...baseCookieOptions,
        maxAge: process.env.ACCESS_TOKEN_MAX_AGE
    })

    res.cookie("refreshToken", refreshToken, {
        ...baseCookieOptions,
        maxAge: process.env.REFRESH_TOKEN_MAX_AGE
    })
}

export {
    generateAccessToken,
    generateRefreshToken,
    setNewTokens
}