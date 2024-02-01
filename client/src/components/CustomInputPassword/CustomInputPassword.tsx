import { Form, Input } from 'antd';
import { NamePath } from 'antd/es/form/interface';

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
				{ required: true, message: 'Обязательное поле' }, 
				()=>{}
			]} /*правило валидации */
		>
			<Input.Password placeholder={placeholder} size="large" />
		</Form.Item>
	);
};

export default CustomInputPassword;
