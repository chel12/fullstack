import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Paths } from './paths';
import { store } from './app/store';
import { ConfigProvider, theme } from 'antd';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Auth from './features/auth/Auth';
import Employees from './pages/Employees/Employees';
import { ADDRCONFIG } from 'dns';
import AddEmployees from './pages/AddEmployees/AddEmployees';
import Status from './pages/Status/Status';
import Employee from './pages/Employee/Employee';
import EditEmployee from './pages/EditEmployee/EditEmployee';

//роутер массив объектов с путями
const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <Employees />,
	},
	{
		path: Paths.login,
		element: <Login />,
	},
	{
		path: Paths.register,
		element: <Register />,
	},
	{
		path: Paths.employeeAdd,
		element: <AddEmployees />,
	},
	//переменная для хранения статусов и компонент
	{
		path: `${Paths.status}/:status`,
		element: <Status />,
	},
	//карточка сотрудника
	{
		path: `${Paths.employee}/:id`,
		element: <Employee />,
	},
	{
		path: `${Paths.employeeEdit}/:id`,
		element: <EditEmployee />,
	},
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider
				theme={{
					algorithm: theme.darkAlgorithm,
				}}>
				<Auth>
					<RouterProvider router={router} />
				</Auth>
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
