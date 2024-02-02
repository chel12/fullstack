import { Card, Form, Row, Space, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomInputPassword from '../../components/CustomInputPassword/CustomInputPassword';
import { Paths } from '../../paths';
import Layout from '../../components/Layout/Layout';

const Register = () => {
	return (
		<Layout>
			<Row align="middle" justify="center">
				<Card title="Зарегестрируйтесь" style={{ width: '30rem' }}>
					<Form onFinish={() => null}>
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
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};

export default Register;
