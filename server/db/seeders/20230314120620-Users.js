/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      login: 'Биба',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'Biba@gmail.com',
      avatar: 'https://i1.sndcdn.com/artworks-VxZqQccFax7YLESD-q7XHUg-t500x500.jpg',
      ready: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Боба',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'Boba@gmail.com',
      avatar: 'https://sun9-76.userapi.com/s/v1/ig2/19cnRJXcN3hpavkhbcPXhInDb2oDt0nndCXA8uNey9-bLdhgU2mQ8sKei837cdRw5_gWi7ngiqB8dZe-1moriNgA.jpg?size=200x200&quality=96&crop=0,0,256,256&ava=1',
      ready: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Петрович',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'Petr@gmail.com',
      avatar: 'https://memepedia.ru/wp-content/uploads/2017/08/%D0%BF%D0%B5%D1%82%D1%80%D0%BE%D0%B2%D0%B8%D1%87-%D0%BC%D1%83%D0%BB%D1%8C%D1%82%D1%84%D0%B8%D0%BB%D1%8C%D0%BC.jpg',
      ready: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Илья',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'ilya@yandex.ru',
      avatar: 'https://smartsworld.ru/data/avatars/h/16/16805.jpg?1652812491',
      ready: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Катя',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'kate@gmail.com',
      avatar: 'https://im.indiatimes.in/media/content/2019/Sep/blinking_guy_meme_1569407297.gif',
      ready: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Тимир',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'timir@gmail.com',
      avatar: 'https://media.tenor.com/hyizwUmf1csAAAAM/billy-herrington-flex.gif',
      ready: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Дима',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'dima@gmail.com',
      avatar: 'https://media4.giphy.com/media/yr7n0u3qzO9nG/giphy.gif?cid=ecf05e479h5k91hxa2epg2zjmboqnxyy9t8tfzz3p75uf35m&rid=giphy.gif&ct=g',
      ready: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Антон',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'anton@gmail.com',
      avatar: 'https://media.tenor.com/tVrkM5XhW-EAAAAM/flick-esfand.gif',
      ready: false,
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
