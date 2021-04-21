const Joi = require("joi");
const { users, products } = require("../../models");

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const findUser = await users.findOne({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      data: {
        user: findUser,
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
exports.getUsers = async (req, res) => {
  try {
    const user = await users.findAll({
      // include: [
      //   {
      //     model: products,
      //     attributes: {
      //       exclude: ["createdAt", "updatedAt", "userId"],
      //     },
      //   },
      // ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      status: "success",
      data: {
        users: user,
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await users.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      data: {
        id,
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
//template
exports.getPartner = async (req, res) => {
  try {
    const partners = await users.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "role", "gender"],
      },
      where: {
        role: "PARTNER",
      },
    });

    res.send({
      status: "success",
      data: {
        partners,
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

exports.functionName = async (req, res) => {
  try {
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
