import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:8000/api',
	prepareHeaders: (headers, { getState }) => {
		//брать токен из хедера на каждый запрос если он там есть
		//если есть токен в сторе?запиши его в переменную или глянь в локал сторе
		const token =
			(getState() as RootState).auth.user?.token ||
			localStorage.getItem('token');

		if (token && token !== null) {
			headers.set('authorization', `Bearer ${token}`);
		}
	},
});

//повторы запросов при провале (кол-во)
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
	reducerPath: 'splitApi', //название
	baseQuery: baseQueryWithRetry,
	refetchOnMountOrArgChange: true, //default
	endpoints: () => ({}),
});
