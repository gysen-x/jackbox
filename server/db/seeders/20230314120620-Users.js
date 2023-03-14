/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      login: 'John Doe',
      password: '1234',
      email: 'ilignatow@gmail.com',
      status: 'admin',
      pointsInGame: '300',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Ilya',
      password: '1234',
      email: 'ignat-ilya@yandex.ru',
      status: 'player',
      pointsInGame: '400',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Kate',
      password: '1234',
      email: 'kate@gmail.com',
      status: 'player',
      pointsInGame: '500',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Timir',
      password: '1234',
      email: 'timir@gmail.com',
      status: 'player',
      pointsInGame: '600',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Dima',
      password: '1234',
      email: 'dima@gmail.com',
      status: 'player',
      pointsInGame: '700',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Anton',
      password: '1234',
      email: 'anton@gmail.com',
      status: 'player',
      pointsInGame: '800',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Sergey',
      password: '1234',
      email: 'sergey@gmail.com',
      status: 'player',
      pointsInGame: '900',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Roman',
      password: '1234',
      email: 'roman@gmail.com',
      status: 'player',
      pointsInGame: '1000',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Artem',
      password: '1234',
      email: 'artem@gmail.com',
      status: 'viewer',
      pointsInGame: '1100',
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
  },
};
