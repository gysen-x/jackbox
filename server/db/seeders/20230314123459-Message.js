'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('People', [{
            roomId: 1,
            userId: 1,
            text: "Привет!",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            roomId: 1,
            userId: 2,
            text: "Hi!",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            roomId: 1,
            userId: 3,
            text: "Че кого?",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            roomId: 1,
            userId: 5,
            text: "Ору",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            roomId: 1,
            userId: 6,
            text: "Чет лол",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }, {
            roomId: 1,
            userId: 2,
            text: "Обстановка по кайфу",
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
