/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Friendships', [{
      userId1: 1,
      userId2: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId1: 2,
      userId2: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId1: 1,
      userId2: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId1: 2,
      userId2: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId1: 3,
      userId2: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId1: 2,
      userId2: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId1: 5,
      userId2: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId1: 4,
      userId2: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId1: 3,
      userId2: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId1: 7,
      userId2: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId1: 6,
      userId2: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId1: 11,
      userId2: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId1: 10,
      userId2: 11,
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
