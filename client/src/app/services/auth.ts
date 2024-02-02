import { User } from '@prisma/client';
import { api } from './api';

export type UserData = Omit<User, 'id'>; //тип как у Юзера, но без 'id' это сделано через Omit
type ResponseLoginData = User & { token: string }; //тип как у юзера + токен с типом строка
export const authApi = api.injectEndpoints({
	//добавление в АПИ енпоинтов
	endpoints: (builder) => ({
		login: builder.mutation<ResponseLoginData, UserData>({
			//пост запрос, отсылаем
			//1 что получим ТИП, 2 что отправим ТИП
			query: (userData) => ({
				url: '/user/login',
				method: 'POST',
				body: userData,
			}),
		}),
		register: builder.mutation<ResponseLoginData, UserData>({
			//пост запрос, отсылаем
			//1 что получим ТИП, 2 что отправим ТИП
			query: (userData) => ({
				url: '/user/register',
				method: 'POST',
				body: userData,
			}),
		}),
		current: builder.query<ResponseLoginData, void>({
			//ГЕТ запрос, Получаем
			//1 что получим ТИП, 2 ничего не получаем
			query: () => ({
				url: '/user/current',
				method: 'GET',
			}),
		}),
	}),
});

//автоматом (их делает билдер как кастом хуки)
export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
	authApi;

export const {
	endpoints: { login, register, current },
} = authApi;
