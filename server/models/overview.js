"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Overview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Overview.hasOne(models.Post, {
        foreignKey: "overviewId",
        as: "overviews",
      });
    }
  }
  Overview.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      code: DataTypes.STRING,
      area: DataTypes.STRING,
      type: DataTypes.STRING,
      target: DataTypes.STRING,
      bonus: DataTypes.STRING,
      created: DataTypes.DATE,
      expired: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Overview",
    }
  );
  return Overview;
};
