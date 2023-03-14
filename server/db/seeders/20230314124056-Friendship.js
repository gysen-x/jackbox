'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('People', [{
            userId1: 1,
            userId2: 2,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId1: 1,
            userId2: 3,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId1: 2,
            userId2: 3,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId1: 2,
            userId2: 4,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId1: 2,
            userId2: 5,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId1: 5,
            userId2: 3,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId1: 4,
            userId2: 3,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId1: 8,
            userId2: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            userId1: 7,
            userId2: 6,
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
