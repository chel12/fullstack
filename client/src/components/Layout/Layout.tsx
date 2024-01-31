import React from 'react';
import styles from './Layout.module.css';
import { Layout as AntLayout } from 'antd';
import Header from '../Header/Header';

type Props = {
	children: React.ReactNode;
};

//для обёртки страниц, чтобы выровнять красиво

//можно так
// const Layout: React.FC<Props> = ({ children }) => {
// или так
const Layout = ({ children }: Props) => {
	return (
		<div className={styles.main}>
			<Header />
			<AntLayout.Content style={{ height: '100%' }}>
				{children}
			</AntLayout.Content>
		</div>
	);
};

export default Layout;
