const { matchedData } = require("express-validator");

const { encrypt, compare } = require("../utils/handlePassword");

const { tokenSign } = require("../utils/handleJwt");

const { userModel } = require("../models");

const { handleHttpError } = require("../utils/handleError");

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req
 * @param {*} res
 */
const registerController = async (req, res) => {
  
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await userModel.create(body);
    //ataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

/**
 * Este controlador es el encargado de logear a una persona
 * @param {*} req
 * @param {*} res
 */
const loginController = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await userModel
      .findOne({ email: req.email })
      .select("password name role email");
    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    const hashPassword = user.get("password");
    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "UNAUTHORIZED", 401);
      return;
    }

    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

module.exports = { registerController, loginController };
