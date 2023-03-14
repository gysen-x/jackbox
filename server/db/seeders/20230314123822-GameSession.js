'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('People', [{
            userId: 1,
            roomId: 1
        }, {
            userId: 2,
            roomId: 1
        }, {
            userId: 3,
            roomId: 1
        }, {
            userId: 4,
            roomId: 1
        }, {
            userId: 5,
            roomId: 1
        }, {
            userId: 6,
            roomId: 1
        }, {
            userId: 7,
            roomId: 1
        }, {
            userId: 8,
            roomId: 1
        }, {
            userId: 9,
            roomId: 1
        }], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
