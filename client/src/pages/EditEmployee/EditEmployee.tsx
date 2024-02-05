import { Employee } from '@prisma/client';
import { Row } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useEditEmployeeMutation,
	useGetEmployeeQuery,
} from '../../app/services/employees';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import Layout from '../../components/Layout/Layout';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';

const EditEmployee = () => {
	const navigate = useNavigate();
	const params = useParams<{ id: string }>();
	const [error, setError] = useState('');
	//получение сотрудника по  id
	//переход на страницу с формой также как и добавление только другой роут
	//произойдёт запрос и получим сотрудника
	//проикинем в емплой форму этого сотрудника, чтобы поля были предзаполнены
	const { data, isLoading } = useGetEmployeeQuery(params.id || '');
	const [editEmployee] = useEditEmployeeMutation();

	if (isLoading) {
		return <span>Загрузка</span>;
	}

	//редактирование

	const handleEdituser = async (employee: Employee) => {
		try {
			const editedEmployee = {
				...data,
				...employee,
			};
			await editEmployee(editedEmployee).unwrap();
			navigate(`${Paths.status}/updated`);
		} catch (error) {
			const maybeError = isErrorWithMessage(error);
			if (maybeError) {
				setError(error.data.message);
			} else {
				setError('Неизвестная ошибка');
			}
		}
	};

	return (
		<Layout>
			<Row align="middle" justify="center">
				<EmployeeForm
					title="Редактировать сотрудника"
					btnText="Редактировать"
					error={error}
					employee={data}
					onFinish={handleEdituser}
				/>
			</Row>
		</Layout>
	);
};

export default EditEmployee;
