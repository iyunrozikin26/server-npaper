"use strict";

const { sequelize } = require("../models");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Profiles", "phoneNumber", { type: Sequelize.STRING });
        await queryInterface.addColumn("Profiles", "address", { type: Sequelize.STRING });
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Profiles", "phoneNumber");
        await queryInterface.removeColumn("Profiles", "address");

        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
