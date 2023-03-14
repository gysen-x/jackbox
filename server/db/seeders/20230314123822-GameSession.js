'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('GameSessions', [{
            userId: 1,
            roomId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            userId: 2,
            roomId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            userId: 3,
            roomId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            userId: 4,
            roomId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            userId: 5,
            roomId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            userId: 6,
            roomId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            userId: 7,
            roomId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            userId: 8,
            roomId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            userId: 9,
            roomId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
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
