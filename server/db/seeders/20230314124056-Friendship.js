'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('People', [{
            userId1: 1,
            userId2: 2
        }, {
            userId1: 1,
            userId2: 3
        }, {
            userId1: 2,
            userId2: 3
        }, {
            userId1: 2,
            userId2: 4
        }, {
            userId1: 2,
            userId2: 5
        }, {
            userId1: 5,
            userId2: 3
        }, {
            userId1: 4,
            userId2: 3
        }, {
            userId1: 8,
            userId2: 1
        }, {
            userId1: 7,
            userId2: 6
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
