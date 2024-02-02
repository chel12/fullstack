import { Card, Form, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation, UserData } from '../../app/services/auth';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomInputPassword from '../../components/CustomInputPassword/CustomInputPassword';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Layout from '../../components/Layout/Layout';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';
//Row  для центровки
//Card для заголовка
//Form из анта
//Input свой custom пишем
const Login = () => {
	const navigate = useNavigate()
	const [loginUser, loginUserResult] = useLoginMutation(); //дестр 1 будет вызывать запрос, 2 принимать результат
	const [error, setError] = useState('');
	const login = async (data: UserData) => {
		//значения и тип их
		try {
			await loginUser(data).unwrap(); //то же что и JSON parse
			navigate("/")
		} catch (err) {
			const maybeError = isErrorWithMessage(err);
			if (maybeError) {
				setError(err.data.message);
			} else {
				setError('Неизвестная ошибка');
			}
		}
	};

	return (
		<Layout>
			<Row align="middle" justify="center">
				<Card title="Войдите" style={{ width: '30rem' }}>
					<Form onFinish={login}>
						<CustomInput
							type="email"
							name="email"
							placeholder="Email"
						/>
						<CustomInputPassword
							name="password"
							placeholder="Пароль"
						/>
						<CustomButton type="primary" htmlType="submit">
							Войти
						</CustomButton>
					</Form>
					<Space direction="vertical" size="large">
						<Typography.Text>
							Нет аккаунта?{' '}
							<Link to={Paths.register}>Зарегистрируйтесь</Link>
						</Typography.Text>
						<ErrorMessage message={error} />
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};

export default Login;
