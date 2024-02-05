import { Employee } from '@prisma/client';
import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddEmployeeMutation } from '../../app/services/employees';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import Layout from '../../components/Layout/Layout';
import { selectUser } from '../../features/auth/authSlice';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';

const AddEmployees = () => {
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const [addEmployee] = useAddEmployeeMutation();
	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [navigate, user]);

	const handleAddEmployee = async (data: Employee) => {
		try {
			await addEmployee(data).unwrap();
			navigate(`${Paths.status}/created`);
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
					title="Добавить сотрудника"
					btnText="Добавить"
					onFinish={handleAddEmployee}
					error={error}
				/>
			</Row>
		</Layout>
	);
};

export default AddEmployees;
