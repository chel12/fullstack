import { Button, Form } from 'antd';

//Типы
type Props = {
	children: React.ReactNode;
	htmlType?: 'button' | 'submit' | 'reset' | undefined;
	onClick?: () => void;
	type?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined;
	danger?: boolean | undefined;
	loading?:
		| boolean
		| {
				delay?: number | undefined;
		  }
		| undefined;
	shape?: 'default' | 'circle' | 'round' | undefined;
	icon?: React.ReactNode;
};

//Универсальная кнопка для переюза
const CustomButton = ({
	children,
	htmlType = 'button',
	type,
	danger,
	loading,
	shape,
	icon,
	onClick,
}: Props) => {
	return (
		<Form.Item>
			<Button
				htmlType={htmlType}
				type={type}
				danger={danger}
				loading={loading}
				shape={shape}
				icon={icon}
				onClick={onClick}>
				{children}
			</Button>
		</Form.Item>
	);
};

export default CustomButton;
//отрисовка кнопки с каким-нибудь элементом
