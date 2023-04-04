/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('AllGames', [{
      name: 'Рифмы и панчи',
      rules: 'Добей шутку',
      description: 'Добей шутку, выиграй остальных',
      img: 'http://funboxgame.ru/api/public/punches.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Coming Soon',
      rules: 'Fun games every month',
      description: 'Wait for it',
      img: 'https://img.freepik.com/free-vector/coming-soon-construction-yellow-design_1017-26685.jpg?w=1380&t=st=1679093645~exp=1679094245~hmac=4ff754877f48b9eaa427e8215a5d4760a00611ae64a7b66e74663b45cfaff462',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Coming Soon',
      rules: 'Fun games every month',
      description: 'Wait for it',
      img: 'https://img.freepik.com/free-vector/coming-soon-yellow-background-design_1017-37084.jpg?w=1380&t=st=1679093678~exp=1679094278~hmac=a832b1f3cfe96cd52a849fca26e42192f6c6c136eeeb58e322bfd7617a7a2112',
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
