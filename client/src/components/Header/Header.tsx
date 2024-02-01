import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Space, Typography } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { Paths } from '../../paths';
import CustomButton from '../CustomButton/CustomButton';
import styles from './Header.module.css';

const Header = () => {
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
		</Layout.Header>
	);
};

export default Header;
