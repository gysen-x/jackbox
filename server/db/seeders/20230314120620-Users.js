/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      login: 'John Doe',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'ilignatow@gmail.com',
      status: 'admin',
      pointsInGame: '300',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Steve_Buscemi_%281996%29.jpg/220px-Steve_Buscemi_%281996%29.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Ilya',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'ignat-ilya@yandex.ru',
      status: 'player',
      pointsInGame: '400',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Steve_Buscemi_%281996%29.jpg/220px-Steve_Buscemi_%281996%29.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Kate',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'kate@gmail.com',
      status: 'player',
      pointsInGame: '500',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Steve_Buscemi_%281996%29.jpg/220px-Steve_Buscemi_%281996%29.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Timir',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'timir@gmail.com',
      status: 'player',
      pointsInGame: '600',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Steve_Buscemi_%281996%29.jpg/220px-Steve_Buscemi_%281996%29.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Dima',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'dima@gmail.com',
      status: 'player',
      pointsInGame: '700',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Steve_Buscemi_%281996%29.jpg/220px-Steve_Buscemi_%281996%29.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Anton',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'anton@gmail.com',
      status: 'player',
      pointsInGame: '800',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Steve_Buscemi_%281996%29.jpg/220px-Steve_Buscemi_%281996%29.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Sergey',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'sergey@gmail.com',
      status: 'player',
      pointsInGame: '900',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Steve_Buscemi_%281996%29.jpg/220px-Steve_Buscemi_%281996%29.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Roman',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'roman@gmail.com',
      status: 'player',
      pointsInGame: '1000',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Steve_Buscemi_%281996%29.jpg/220px-Steve_Buscemi_%281996%29.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Artem',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'artem@gmail.com',
      status: 'viewer',
      pointsInGame: '1100',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Steve_Buscemi_%281996%29.jpg/220px-Steve_Buscemi_%281996%29.jpg',
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
