import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Descriptions, Divider, Modal, Space } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
	useGetEmployeeQuery,
	useRemoveEmployeeMutation,
} from '../../app/services/employees';
import CustomButton from '../../components/CustomButton/CustomButton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Layout from '../../components/Layout/Layout';
import { selectUser } from '../../features/auth/authSlice';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';

const Employee = () => {
	//для перекида
	const navigate = useNavigate();
	//для ошибок
	const [error, setError] = useState('');
	//параметры чтобы взять id из адресной
	const params = useParams<{ id: string }>();
	//тогл модалки
	const [isModalOpen, setIsModalOpen] = useState(false);
	//для получения сотрудника
	const { data, isLoading } = useGetEmployeeQuery(params.id || '');
	//для удаления сотрудника
	const [removeEmployee] = useRemoveEmployeeMutation();
	//для проверки есть ли такой юзер чтобы удалять мог тот кто создавал
	const user = useSelector(selectUser);
	if (isLoading) {
		return <span>Загрузка</span>;
	}
	if (!data) {
		return <Navigate to="/" />;
	}

	//для открытия модалки
	const showModal = () => {
		setIsModalOpen(true);
	};
	const hideModal = () => {
		setIsModalOpen(false);
	};
	//удаление ОК
	const handleDeleteUser = async () => {
		hideModal();
		try {
			await removeEmployee(data.id).unwrap();
			navigate(`${Paths.status}/deleted`);
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
			<Descriptions title="Информация о сотруднике" bordered>
				<Descriptions.Item label="Имя" span={3}>
					{`${data.firstName} ${data.lastName}`}
				</Descriptions.Item>
				<Descriptions.Item label="Возраст" span={3}>
					{data.age}
				</Descriptions.Item>
				<Descriptions.Item label="Адрес" span={3}>
					{data.address}
				</Descriptions.Item>
			</Descriptions>
			{user?.id === data.userId && (
				<>
					<Divider orientation="left">Действия</Divider>
					<Space>
						<Link to={`/employee/edit/${data.id}`}>
							<CustomButton
								shape="round"
								type="default"
								icon={<EditOutlined />}>
								Редактировать
							</CustomButton>
						</Link>
						<CustomButton
							shape="round"
							danger
							onClick={showModal}
							icon={<DeleteOutlined />}>
							Удалить
						</CustomButton>
					</Space>
				</>
			)}
			<ErrorMessage message={error}></ErrorMessage>
			<Modal
				title="Подтвердите удаление"
				open={isModalOpen}
				onOk={handleDeleteUser}
				onCancel={hideModal}
				okText="Подтвердить"
				cancelText="Отменить">
				Вы действительно хотите удалить сотрудника из таблицы?
			</Modal>
		</Layout>
	);
};

export default Employee;
