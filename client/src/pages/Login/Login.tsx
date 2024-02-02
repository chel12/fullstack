import { Card, Form, Row, Space, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomInputPassword from '../../components/CustomInputPassword/CustomInputPassword';
import Layout from '../../components/Layout/Layout';
import { Paths } from '../../paths';
//Row  для центровки
//Card для заголовка
//Form из анта
//Input свой custom пишем
const Login = () => {
	return (
		<Layout>
			<Row align="middle" justify="center">
				<Card title="Войдите" style={{ width: '30rem' }}>
					<Form onFinish={() => null}>
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
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};

export default Login;
