const {
  users,
  products,
  transactions,
  product_transaction,
} = require("../../models");

exports.getTransaction = async (req, res) => {
  try {
    const transaction = await transactions.findAll({
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "password",
              "createdAt",
              "updatedAt",
              "gender",
              "image",
              "role",
            ],
          },
        },
        {
          model: products,
          as: "order",
          where: {
            userId: req.userId.id,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId"],
          },
          through: {
            model: product_transaction,
            as: "jembatan",
            attributes: [],
          },
        },
      ],
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: {
        transaction,
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

exports.getDetailTransaction = async (req, res) => {
  try {
    const transaction = await transactions.findAll({
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "password",
              "createdAt",
              "updatedAt",
              "gender",
              "image",
              "role",
            ],
          },
        },
        {
          model: products,
          as: "order",
          where: {
            userId: req.userId.id,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId"],
          },
          through: {
            model: product_transaction,
            as: "jembatan",
            attributes: [],
          },
        },
      ],
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      where: {
        id: req.params.id,
      },
    });
    res.send({
      status: "success",
      data: {
        transaction,
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

exports.addTransaction = async (req, res) => {
  try {
    const createTransaction = await transactions.create({
      userId: req.userId.id,
      total: req.body.total,
      status: "Waiting Proccess",
    });
    const addTransaction = await product_transaction.bulkCreate(
      req.body.product.map((data, key) => ({
        transactionId: createTransaction.id,
        productId: req.body.product[key].id,
        qty: req.body.product[key].qty,
      }))
    );

    const transaction = await transactions.findAll({
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "password",
              "createdAt",
              "updatedAt",
              "gender",
              "image",
              "role",
            ],
          },
        },
        {
          model: products,
          as: "order",
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId"],
          },
          through: {
            model: product_transaction,
            as: "jembatan",
            attributes: [],
          },
        },
      ],
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      where: {
        id: createTransaction.id,
      },
    });
    res.send({
      status: "success",
      data: {
        transaction,
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

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const checkIdTransaction = await transactions.findOne({
      where: {
        id,
      },
    });
    const checkPartner = await transactions.findOne({
      include: {
        model: products,
        as: "order",
        where: {
          userId: req.userId.id,
        },
      },
      where: {
        id,
      },
    });

    if (!checkIdTransaction)
      return res.status(404).send({
        status: "failed",
        message: `Transaction with id: ${id} not found`,
      });

    if (!checkPartner)
      return res.status(404).send({
        status: "failed",
        message: "You haven't authorization to edit this transaction.",
      });

    const upTransaction = await transactions.update(req.body, {
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      data: {
        upTransaction,
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

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const checkPartner = await transactions.findOne({
      include: {
        model: products,
        as: "order",
        where: {
          userId: req.userId.id,
        },
      },
      where: {
        id,
      },
    });

    if (!checkPartner)
      return res.status(404).send({
        status: "failed",
        message: "You haven't authorization to edit this transaction.",
      });

    const deleteTransaction = await transactions.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: {
        deleteTransaction,
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
exports.customerTransaction = async (req, res) => {
  try {
    const transaction = await transactions.findAll({
      include: {
        model: products,
        as: "order",
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"],
        },
        through: {
          model: product_transaction,
          as: "jembatan",
          attributes: [],
        },
      },
      attributes: {
        exclude: ["userId", "updatedAt"],
      },
      where: {
        userId: req.userId.id,
      },
    });
    res.send({
      status: "success",
      data: {
        transaction,
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
