'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('People', [{
            userId: 1,
            roomId: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId: 2,
            roomId: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId: 3,
            roomId: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId: 4,
            roomId: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId: 5,
            roomId: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId: 6,
            roomId: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId: 7,
            roomId: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId: 8,
            roomId: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId: 9,
            roomId: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
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
