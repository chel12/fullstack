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
		if (!data.firstName || !data.lastName || !data.adress || !data.age) {
			return res.status(400).json({ message: 'Все поля обязательны' });
		}
		const employee = await prisma.user.update({
			//у пользователя который прямо сейчас добавляет сотрудника, найди его в БД
			where: {
				id: req.user.id,
			},
			//и добавь ему в виде даты с данными из даты которые берутся из реквеста
			data: {
				createdEmploy: {
					create: data,
				},
			},
		});
		return res.status(201).json(employee);
	} catch (error) {
		return res.status(500).json({ message: 'Что-то пошло не так' });
	}
};

module.exports = {
	all,
	add,
};
