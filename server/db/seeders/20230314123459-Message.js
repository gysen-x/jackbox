'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Messages', [{
            roomId: 1,
            userId: 1,
            text: "Привет!",
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            roomId: 1,
            userId: 2,
            text: "Hi!",
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            roomId: 1,
            userId: 3,
            text: "Че кого?",
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            roomId: 1,
            userId: 5,
            text: "Ору",
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            roomId: 1,
            userId: 6,
            text: "Чет лол",
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            roomId: 1,
            userId: 2,
            text: "Обстановка по кайфу",
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
