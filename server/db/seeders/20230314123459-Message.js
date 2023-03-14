'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('People', [{
            roomId: 1,
            userId: 1,
            text: "Привет!"
        }, {
            roomId: 1,
            userId: 2,
            text: "Hi!"
        }, {
            roomId: 1,
            userId: 3,
            text: "Че кого?"
        }, {
            roomId: 1,
            userId: 5,
            text: "Ору"
        }, {
            roomId: 1,
            userId: 6,
            text: "Чет лол"
        }, {
            roomId: 1,
            userId: 2,
            text: "Обстановка по кайфу"
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
