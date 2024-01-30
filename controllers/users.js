const { prisma } = require('../prisma/prisma-client');
const brypt = require('bcrypt'); //для кеширвоания пароля
const jwt = require('jsonwebtoken'); //библиотека чтобы давать токены

/**
 * @route POST /api/user/login
 * @desc Логин
 * @access Public
 */

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		// проверка
		return res
			.status(400)
			.json({ message: 'Пожалуйста, заполните обязательные поля' }); //ответ джесоном потом фронтом отобразим
	}

	const user = await prisma.user.findFirst({
		//вместо запроса в бд, +++ORM
		where: {
			email,
		},
	});
	//для проверки хэш пароля
	//переменная для записи в неё проверки пароля
	const isPasswordCorrect =
		user && (await brypt.compare(password, user.password)); //сравнивает пароль который ввели и пароль пользователя

	//секретная строка для генерации токена
	const secret = process.env.JWT_SECRET;

	//условие проверки если пользователь есть и пароль верный тогда вернуть статус 200 и json
	if (user && isPasswordCorrect && secret) {
		res.status(200).json({
			id: user.id,
			email: user.email,
			name: user.name,
			token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
		});
	} else {
		//иначе что-то не верно
		return res
			.status(400)
			.json({ message: 'Неверно введён логин или пароль' });
	}
};

/**
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */

const register = async (req, res) => {
	res.send('register');
};

/**
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */

const current = async (req, res) => {
	return res.status(200).json(req.user);
};
module.exports = {
	login,
	register,
	current,
};
