/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Setup',
            [
                {
                    body: 'Явный признак того, что твои родители тебя усыновили?',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'Как по-другому назвать одичное заключение в тюрьме, чтобы это звучало получше?',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'Это определенно не стоит говорить находясь рядом с Квантумом?',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'Как ленивый ковбой назвал свою лошадку?',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'Хороший способ завести друзей в парилке - снять полотенце и ',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'Самое сильное заявление, которое можно объявить, покидая комнату?',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'То, что ты не оидал прочесть на записке из бытылки',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'Вопрос, на который наука никогда не ответит',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'Когда аисты не приносят детей, они ___',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'Как назывался бы 13-ый месяц в году?',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'Придумайте новое название для патриотичных подгузников',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'В учебниках истории в разделе про 2007-ой обязательно напишут про',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'Если Иваново - город невест, то Воронеж - город ___',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'Самое страшное, что ты можешь найти в пещере',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
                {
                    body: 'Если бы усы Якубовича могли говорить, чтобы они сказали',
                    gameId: 1,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                },
            ],

            {},
        );
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
