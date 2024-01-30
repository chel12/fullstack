//Мидлвар будет проверять перед каждым запросом есть ли токен
const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');

//в запросе уже имеем доступ к токену
const auth = async (req, res, next) => {
	try {
		//токен достается из хедера
		let token = req.headers.authorization?.split(' ')[1]; //разделяем из-за Beriar. Бериар [0] а токен [1]
		const decoded = jwt.verify(token, process.env.JWT_SECRET); //секретка берется для расшифровки текущего токена
		const user = await prisma.user.findUnique({
			//искать пользователя по id в БД id берется из токена
			where: {
				id: decoded.id,
			},
		});

		//если все ок закидываем найденного пользователя в реквест и делегируем дальше
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Пользователь не авторизован' });
	}
};

module.exports = {
	auth,
};
