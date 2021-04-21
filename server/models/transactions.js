"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transactions.belongsTo(models.users, {
        as: "user",
        foreignKey: "userId",
      });
      transactions.belongsToMany(models.products, {
        as: "order",
        through: {
          model: "product_transaction",
          as: "jembatan",
          foreignKey: "transactionId",
        },
      });
    }
  }
  transactions.init(
    {
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      total: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "transactions",
    }
  );
  return transactions;
};
