const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /api/employess
 * @desc Получение всех сотрудников
 * @access Private
 */

const all = async (req, res) => {
	try {
		const emloyees = await prisma.employee.findMany(); //идет в модель емплой и ищет всех сотрудников
		res.status(200).json(emloyees); //возвращает если все ок
	} catch (error) {
		res.status(500).json({ message: 'Не удалось получить сотрудников' });
	}
};

/**
 * @route POST /api/employees/add
 * @desc добавление сотрудника
 * @access Private
 */

const add = async (req, res) => {
	try {
		const data = req.body;

		if (!data.firstName || !data.lastName || !data.address || !data.age) {
			return res.status(400).json({ message: 'Все поля обязательны' });
		}

		// await prisma.user.update({
		// 	//у пользователя который прямо сейчас добавляет сотрудника, найди его в БД
		// 	where: {
		// 		id: req.user.id,
		// 	},
		// 	//и добавь ему в виде даты с данными из даты которые берутся из реквеста
		// 	data: {
		// 		createdEmploy: {
		// 			create: data,
		// 		},
		// 	},
		// });
		const employee = await prisma.employee.create({
			data: {
				...data,
				userId: req.user.id,
			},
		});

		return res.status(201).json(employee);
	} catch (error) {
		return res.status(500).json({ message: 'Что-то пошло не так' });
	}
};

/**
 * @route POST /api/employees/remove/:id
 * @desc удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
	const { id } = req.body;
	try {
		await prisma.employee.delete({
			where: {
				id,
			},
		});
		res.status(204).json('OK');
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Не удалось удалить сотрудника' });
	}
};

/**
 * @route PUT /api/employees/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
	const data = req.body;
	const id = data.id;
	try {
		await prisma.employee.update({
			where: {
				id,
			},
			data,
		});
		res.status(204).json('OK');
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Не удалось редактировать сотрудника' });
	}
};

/**
 * @route GET /api/employees/:id
 * @desc Получение сотрудника
 * @access Private
 */

const employee = async (req, res) => {
	const { id } = req.params;
	try {
		const employee = await prisma.employee.findUnique({
			where: {
				id,
			},
		});
		res.status(200).json(employee);
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Не удалось получить сотрудника' });
	}
};

module.exports = {
	all,
	add,
	remove,
	edit,
	employee,
};
