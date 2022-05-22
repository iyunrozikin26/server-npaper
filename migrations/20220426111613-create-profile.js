"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Profiles", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            studentID: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            university: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            studyProgram: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            image: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            UserId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Profiles");
    },
};
