'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [{
            login: 'John Doe',
            password: '1234',
            email: 'ilignatow@gmail.com',
            status: 'admin',
            roomId: '1',
            pointInGame: '300'
        }, {
            login: 'Ilya',
            password: '1234',
            email: 'ignat-ilya@yandex.ru',
            status: 'player',
            roomId: '1',
            pointInGame: '400'
        }, {
            login: 'Kate',
            password: '1234',
            email: 'kate@gmail.com',
            status: 'player',
            roomId: '1',
            pointInGame: '500'
        }, {
            login: 'Timir',
            password: '1234',
            email: 'timir@gmail.com',
            status: 'player',
            roomId: '1',
            pointInGame: '600'
        }, {
            login: 'Dima',
            password: '1234',
            email: 'dima@gmail.com',
            status: 'player',
            roomId: '1',
            pointInGame: '700'
        }, {
            login: 'Anton',
            password: '1234',
            email: 'anton@gmail.com',
            status: 'player',
            roomId: '1',
            pointInGame: '800'
        }, {
            login: 'Sergey',
            password: '1234',
            email: 'sergey@gmail.com',
            status: 'player',
            roomId: '1',
            pointInGame: '900'
        }, {
            login: 'Roman',
            password: '1234',
            email: 'roman@gmail.com',
            status: 'player',
            roomId: '1',
            pointInGame: '1000'
        }, {
            login: 'Artem',
            password: '1234',
            email: 'artem@gmail.com',
            status: 'viewer',
            roomId: '1',
            pointInGame: '1100'
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
