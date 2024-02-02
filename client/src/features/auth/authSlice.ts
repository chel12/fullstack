import { User } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../app/services/auth';
import { RootState } from '../../app/store';

interface InitialState {
	//тип
	user: (User & { token: string }) | null;
	isAuthenticated: boolean;
}

const initialState: InitialState = {
	//исходные данные
	user: null,
	isAuthenticated: false,
};

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		//экшены
		logout: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, action) => {
					state.user = action.payload;
					state.isAuthenticated = true;
				}
			)
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, action) => {
					state.user = action.payload;
					state.isAuthenticated = true;
				}
			)
			.addMatcher(
				authApi.endpoints.current.matchFulfilled,
				(state, action) => {
					state.user = action.payload;
					state.isAuthenticated = true;
				}
			);
	},
});

export const { logout } = slice.actions; //импорт выхода из логина
export default slice.reducer;

//достать isAuthenticated
export const selectisAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;

//достать user
export const selectUser = (state: RootState) => state.auth.user;
