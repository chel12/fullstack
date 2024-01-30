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

	//условие проверки если пользователь есть и пароль верный тогда вернуть статус 200 и json
	if (user && isPasswordCorrect) {
		res.status(200).json({
			id: user.id,
			email: user.email,
			name: user.name,
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
	const { email, password, name } = req.body; //запрос который получаем
	//проверки
	if (!email || !password || !name) {
		return res
			.status(400)
			.json({ message: 'Пожалуйста, заполните обязательные поля' });
	}
	const registeredUser = await prisma.user.findFirst({
		where: {
			email,
		},
	}); //проверка, есть ли такой пользователь в базе данных
	if (registeredUser) {
		//если есть такой уже, тогда возвращаем
		return res
			.status(400)
			.json({ message: 'Пользователь, с таким email уже существует' });
	}
	//подготовка пароля к записи в БД
	const salt = await brypt.genSalt(10); //соль будет добавляться к хешу дял безопасности
	const hashedPassword = await brypt.hash(password, salt); //хеширование пароля + соль

	//создание модели пользователя
	//создаём через призму в БД пользователя с данными из запроса + хеш пароль + соль к хешу
	const user = await prisma.user.create({
		data: {
			email,
			name,
			password: hashedPassword,
		},
	});

	//секретная строка для генерации токена
	const secret = process.env.JWT_SECRET;
	//с помощью него можно расшивровывать пароли

	if (user && secret) {
		res.status(201).json({
			id: user.id,
			email: user.email,
			name,
			//выдаём токен (1 кому, 2 секретка, 3 на сколько )
			token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
		});
	} else {
		return res
			.status(400)
			.json({ message: 'Не удалось создать пользователя' });
	}
};

const current = async (req, res) => {
	res.send('current');
};
module.exports = {
	login,
	register,
	current,
};
