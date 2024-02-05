import { Card, Form, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomInputPassword from '../../components/CustomInputPassword/CustomInputPassword';
import { Paths } from '../../paths';
import Layout from '../../components/Layout/Layout';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { useRegisterMutation } from '../../app/services/auth';
import { User } from '@prisma/client';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

type RegisterData = Omit<User, 'id'> & { confirmPassword: string };

const Register = () => {
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const [error, setError] = useState('');
	const [registeruser] = useRegisterMutation();

	const register = async (data: RegisterData) => {
		try {
			await registeruser(data).unwrap();
			navigate('/');
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
				<Card title="Зарегестрируйтесь" style={{ width: '30rem' }}>
					<Form onFinish={register}>
						<CustomInput name="name" placeholder="Имя" />
						<CustomInput
							type="email"
							name="email"
							placeholder="Email"
						/>
						<CustomInputPassword
							name="password"
							placeholder="Пароль"
						/>
						<CustomInputPassword
							name="confirmPassword"
							placeholder="Повторите пароль"
						/>
						<CustomButton type="primary" htmlType="submit">
							Зарегестрироваться
						</CustomButton>
					</Form>
					<Space direction="vertical" size="large">
						<Typography.Text>
							Уже зарегестрированы?{' '}
							<Link to={Paths.login}>Войти</Link>
						</Typography.Text>
						<ErrorMessage message={error}></ErrorMessage>
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};

export default Register;
