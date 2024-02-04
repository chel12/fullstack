import React from 'react';
import { useCurrentQuery } from '../../app/services/auth';

//текущий проверка

const Auth = ({ children }: { children: JSX.Element }) => {
	const {isLoading} = useCurrentQuery();
	if(isLoading){
		return <span>Загрузка</span>
	}
	return children
};

export default Auth;
