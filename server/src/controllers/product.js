const Joi = require("joi");
const { users, products } = require("../../models");
const { Op } = require("sequelize");

exports.getProducts = async (req, res) => {
  try {
    const product = await products.findAll({
      include: [
        {
          model: users,
          attributes: {
            exclude: [
              "password",
              "createdAt",
              "updatedAt",
              "gender",
              "role",
              "image",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
    });
    res.send({
      status: "success",
      data: {
        products: product,
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

exports.getProductsPartner = async (req, res) => {
  try {
    const { id } = req.params;
    const productPartner = await products.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      where: {
        userId: id,
      },
    });

    console.log("product", productPartner);
    res.send({
      status: "success",
      data: {
        products: productPartner,
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

exports.getDetailProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const detailsProduct = await products.findOne({
      include: {
        model: users,
        attributes: {
          exclude: [
            "password",
            "createdAt",
            "updatedAt",
            "image",
            "gender",
            "role",
          ],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: {
        products: detailsProduct,
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

exports.addProduct = async (req, res) => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(10).max(50).required(),
      price: Joi.string().min(3).max(50).required(),
      image: Joi.string().min(3).max(255).required(),
    });
    const { error } = schema.validate(req.body);

    if (error)
      return res.status(500).send({
        status: "Validate Failed",
        message: error.details[0].message,
      });

    const user = await users.findOne({
      attributes: {
        exclude: [
          "password",
          "createdAt",
          "updatedAt",
          "gender",
          "role",
          "image",
        ],
      },
      where: {
        id: req.userId.id,
      },
    });

    const product = await products.create({
      ...req.body,
      userId: req.userId.id,
    });

    res.send({
      status: "success",
      data: {
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          user: { user },
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

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const checkId = await products.findOne({
      where: {
        id,
      },
    });

    if (!checkId)
      return res.status(404).send({
        status: "failed",
        message: `Product with id: ${id} not found`,
      });

    const upProduct = await products.update(req.body, {
      where: {
        [Op.and]: [{ id }, { userId: req.userId.id }],
      },
    });

    if (upProduct == 0)
      return res.status(401).send({
        status: "failed",
        message: "You haven't authorization to edit this product.",
      });

    const product = await products.findOne({
      include: {
        model: users,
        attributes: {
          exclude: [
            "updatedAt",
            "createdAt",
            "role",
            "image",
            "gender",
            "password",
          ],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: {
        product,
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

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await products.destroy({
      where: {
        [Op.and]: [{ id }, { userId: req.userId.id }],
      },
    });

    if (deleteProduct == 0)
      return res.status(401).send({
        status: "failed",
        message: "You haven't authorization to delete this product",
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
