import { ErrorWithMessage } from '../types';
//чтобы удостовериться что у ошибки есть обьект и дата

export const isErrorWithMessage = (
	error: unknown
): error is ErrorWithMessage => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'data' in error &&
		//error это обьект с ключами и значениями (рекорд это показывает)
		typeof (error as Record<string, unknown>).data === 'object'
	);
};
