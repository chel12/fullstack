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

//роутер массив объектов с путями
const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <App />,
	},
	{
		path: Paths.login,
		element: <Login />,
	},
	{
		path: Paths.register,
		element: <Register />,
	},
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider theme={{
				algorithm:theme.darkAlgorithm
			}}>
				<RouterProvider router={router} />
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
