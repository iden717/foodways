const Joi = require("joi");
const { users } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(12).max(30).required(),
      password: Joi.string().min(6).max(50).required(),
      fullname: Joi.string().min(3).max(50).required(),
      gender: Joi.string().min(4).max(25).required(),
      phone: Joi.string().min(10).max(13).required(),
      role: Joi.string().min(3).max(20).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "Validate Failed",
        message: error.details[0].message,
      });

    const checkEmail = await users.findOne({
      where: {
        email,
      },
    });

    if (checkEmail)
      return res.status(400).send({
        status: "Register failed",
        message: "Email already registered",
      });

    const hashStrength = 10;
    const hashPassword = await bcrypt.hash(password, hashStrength);

    const user = await users.create({
      ...req.body,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY
    );

    res.send({
      status: "success",
      data: {
        user: {
          fullname: user.fullname,
          token,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(10).max(50).required(),
      password: Joi.string().min(6).max(50).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    const checkEmail = await users.findOne({
      where: {
        email,
      },
    });

    if (!checkEmail)
      return res.status(400).send({
        status: "login failed",
        message: "Your credentials is not valid",
      });

    const isPassword = await bcrypt.compare(password, checkEmail.password);

    if (!isPassword)
      return res.status(400).send({
        status: "login failed",
        message: "Your credentials is not valid",
      });

    const token = jwt.sign(
      {
        id: checkEmail.id,
      },
      process.env.SECRET_KEY
    );
    res.send({
      status: "success",
      data: {
        user: {
          fullname: checkEmail.fullname,
          email: checkEmail.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const user = await users.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      where: {
        id: req.userId.id,
      },
    });
    res.send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};
