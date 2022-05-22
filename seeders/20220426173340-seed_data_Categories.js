"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        let categories = require("../data/categories.json");
        categories = categories.map((category) => {
            category.createdAt = new Date();
            category.updatedAt = new Date();
            return category;
        });
        await queryInterface.bulkInsert("Categories", categories);
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Categories", null);

        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
