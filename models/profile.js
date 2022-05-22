"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Profile.belongsTo(models.User, { foreignKey: "UserId" });
        }
    }
    Profile.init(
        {
            firstName: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: { message: "first name not be null" },
                    notEmpty: { message: "first name not be empty" },
                },
            },
            lastName: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: { message: "last name not be null" },
                    notEmpty: { message: "last name not be empty" },
                },
            },
            studentID: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: { message: "studentID not be null" },
                    notEmpty: { message: "studentID not be empty" },
                },
            },
            university: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: { message: "university not be null" },
                    notEmpty: { message: "university not be empty" },
                },
            },
            studyProgram: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: { message: "studyProgram not be null" },
                    notEmpty: { message: "studyProgram not be empty" },
                },
            },
            image: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: { message: "image not be null" },
                    notEmpty: { message: "image not be empty" },
                },
            },
            phoneNumber: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: { message: "image not be null" },
                    notEmpty: { message: "phoneNumber not be empty" },
                },
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: { message: "image not be null" },
                    notEmpty: { message: "address not be empty" },
                },
            },
            UserId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
                onUpdate: "cascade",
                onDelete: "cascade",
            },
        },
        {
            sequelize,
            modelName: "Profile",
        }
    );
    return Profile;
};
