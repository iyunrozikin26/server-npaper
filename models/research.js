"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Research extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Research.belongsTo(models.User, {foreignKey: "UserId"})
            Research.belongsTo(models.Category, {foreignKey: "CategoryId"})
        }
    }
    Research.init(
        {
            title: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: { message: "title not be null" },
                    notEmpty: { message: "title not be empty" },
                },
            },
            abstract: {
                allowNull: false,
                type: DataTypes.TEXT,
                validate: {
                    notNull: { message: "abstract not be null" },
                    notEmpty: { message: "abstract not be empty" },
                },
            },
            document: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: { message: "document not be null" },
                    notEmpty: { message: "document not be empty" },
                },
            },
            location: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: { message: "location not be null" },
                    notEmpty: { message: "location not be empty" },
                },
            },
            status: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: { message: "status not be null" },
                    notEmpty: { message: "status not be empty" },
                },
            },
            UserId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                validate: {
                    notNull: { message: "UserId not be null" },
                    notEmpty: { message: "UserId not be empty" },
                },
            },
            CategoryId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                validate: {
                    notNull: { message: "CategoryId not be null" },
                    notEmpty: { message: "CategoryId not be empty" },
                },
            },
        },
        {
            sequelize,
            modelName: "Research",
        }
    );
    return Research;
};
