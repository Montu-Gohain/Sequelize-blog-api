const JWT = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();

// * This file will perform two functions it'll sign tokens and it will validate tokens

const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "50s",
      issuer: "montudev.com",
      audience: userId,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
        return;
      }
      resolve(token);
    });
  });
};
const verifyAccessToken = async (req, res, next) => {
  if (!req.headers["authorization"]) return next(createError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
};
const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "1y",
      issuer: "montudev.com",
      audience: userId,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        // reject(err)
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};
const verifyRefreshToken = async (req, res, next) => {
  if (!req.headers["authorization"]) return next(createError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  JWT.verify(token, process.env.REFRESHs_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
