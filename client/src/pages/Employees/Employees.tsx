import { PlusCircleOutlined } from '@ant-design/icons';
import { Employee } from '@prisma/client';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllEmployeesQuery } from '../../app/services/employees';
import CustomButton from '../../components/CustomButton/CustomButton';
import Layout from '../../components/Layout/Layout';
import { selectUser } from '../../features/auth/authSlice';
import { Paths } from '../../paths';

//колонки для таблицы
const columns: ColumnsType<Employee> = [
	{
		title: 'Имя',
		dataIndex: 'firstName',
		key: 'firstName',
	},
	{
		title: 'Возраст',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Адрес',
		dataIndex: 'address',
		key: 'address',
	},
];

const Employees = () => {
	const { data, isLoading } = useGetAllEmployeesQuery();
	const user = useSelector(selectUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [navigate, user]);

	const goToAddUser = () => navigate(Paths.employeeAdd);
	return (
		<Layout>
			<CustomButton
				type="primary"
				onClick={goToAddUser}
				icon={<PlusCircleOutlined />}>
				Добавить
			</CustomButton>
			<Table
				loading={isLoading}
				dataSource={data}
				pagination={false}
				columns={columns}
				rowKey={(record) => record.id}
				//onRow при клике. Чтобы достать сотрудника по id и
				onRow={(record) => {
					return {
						onClick: () =>
							navigate(`${Paths.employee}/${record.id}`),
					};
				}}
			/>
		</Layout>
	);
};

export default Employees;
