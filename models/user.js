"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../middlewares/bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasOne(models.Profile, { foreignKey: "UserId" });
            User.hasMany(models.Research, { foreignKey: "UserId" });
        }
    }
    User.init(
        {
            username: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: { message: "username sudah terdaftar" },
                validate: {
                    notNull: { message: "email not be null" },
                    notEmpty: { message: "username is required" },
                },
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: { message: "email sudah terdaftar" },
                validate: {
                    isEmail: true,
                    notNull: { message: "email not be null" },
                    notEmpty: { message: "email not be empty" },
                },
            },
            password: {
                allowNull: false,
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: { message: "password not be empty" },
                    len: {
                        args: [5, 50],
                        message: "password  min. 5 character",
                    },
                },
            },
            role: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    User.addHook("beforeCreate", (user) => {
        user.password = hashPassword(user.password);
        user.role = "student";
    });
    return User;
};
