import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout, selectUser } from '../../features/auth/authSlice';
import { Paths } from '../../paths';
import CustomButton from '../CustomButton/CustomButton';
import styles from './Header.module.css';

const Header = () => {
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	//диспатч чтобы отправлять логаут
	const dispatch = useDispatch();
	const onLogoutClick = () => {
		dispatch(logout());
		localStorage.removeItem('token');
		navigate('/login');
	};

	return (
		<Layout.Header className={styles.header}>
			<Space>
				<TeamOutlined className={styles.teamIcon} />
				<Link to={Paths.home}>
					<CustomButton type="primary">
						<Typography.Title level={1}>
							Сотрудники
						</Typography.Title>
					</CustomButton>
				</Link>
			</Space>

			{user ? (
				<CustomButton
					type="primary"
					icon={<LoginOutlined />}
					onClick={onLogoutClick}>
					Выйти
				</CustomButton>
			) : (
				<Space>
					<Link to={Paths.register}>
						<CustomButton type="primary" icon={<UserOutlined />}>
							Зарегистрироваться
						</CustomButton>
					</Link>
					<Link to={Paths.login}>
						<CustomButton type="primary" icon={<LoginOutlined />}>
							Войти
						</CustomButton>
					</Link>
				</Space>
			)}
		</Layout.Header>
	);
};

export default Header;
