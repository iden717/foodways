const { users } = require("../../models");

exports.checkRolePartner = async (req, res, next) => {
  try {
    const user = await users.findOne({
      where: {
        id: req.userId.id,
      },
    });

    if (user.role === "PARTNER") {
      next();
    } else {
      res.status(401).send({
        status: "failed",
        message: "Can't access, Because you are not partner",
      });
    }
  } catch (error) {
    res.status(401).send({
      status: "failed",
      message: "Your role not allowed",
    });
  }
};

exports.checkRoleCustomer = async (req, res, next) => {
  try {
    const user = await users.findOne({
      where: {
        id: req.userId.id,
      },
    });

    if (user.role === "CUSTOMER") {
      next();
    } else {
      res.status(401).send({
        status: "failed",
        message: "Can't access, Because you are not customer",
      });
    }
  } catch (error) {
    res.status(401).send({
      status: "failed",
      message: "Your role not allowed",
    });
  }
};
