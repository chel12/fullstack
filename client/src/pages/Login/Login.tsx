import { Card, Form, Row } from 'antd';
import React from 'react';
import Layout from '../../components/Layout/Layout';
//Row  для центровки
//Card для заголовка
//Form из анта
//Input свой custom пишем
const Login = () => {
	return (
		<Layout>
			<Row align="middle" justify="center">
				<Card title="Войдите" style={{ width: '30rem' }}></Card>
				<Form onFinish={() => null}>

				</Form>
			</Row>
		</Layout>
	);
};

export default Login;
