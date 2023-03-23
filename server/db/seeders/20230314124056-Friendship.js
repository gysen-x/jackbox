/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const friends = [];
    for (let i = 1; i < 9; i += 1) {
      for (let j = 1; j < 9; j += 1) {
        if (i !== j) {
          friends.push({
            userId1: i,
            userId2: j,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    }

    await queryInterface.bulkInsert('Friendships', friends, {});
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
