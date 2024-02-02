import { Form, Input } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { off } from 'process';

type Props = {
	name: string;
	placeholder: string;
	dependencies?: NamePath[]; //? Для пароля и повторения пароля (зависимость одного инпута от другого)
};

const CustomInputPassword = ({ name, placeholder, dependencies }: Props) => {
	return (
		<Form.Item
			name={name}
			dependencies={dependencies}
			hasFeedback={true}
			rules={[
				{
					required: true,
					message: 'Обязательное поле',
				},
				({ getFieldValue }) => ({
					validator(_, value) {
						if (!value) {
							return Promise.resolve();
						}
						if (name === 'confirmPassword') {
							//имя которое будет у первого пароля и проверка к нему
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error('Пароли должны совпадать')
							);
						} else {
							if (value.length < 6) {
								return Promise.reject(
									new Error(
										'Пароль должен быть не менее 6 символов'
									)
								);
							}
							return Promise.resolve();
						}
					},
				}),
			]} /*правило валидации */ /*функция которая берет обьект*/ /*в antd где повтор пароля глягуть можно*/
		>
			<Input.Password placeholder={placeholder} size="large" />
		</Form.Item>
	);
};

export default CustomInputPassword;
