/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('AllGames', [{
      name: 'Рифмы и панчи',
      rules: 'Добей шутку',
      description: 'Добей шутку, выиграй остальных',
      maxPlayers: 8,
      img: 'https://stihi.ru/pics/2014/02/28/5146.jpg',
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
