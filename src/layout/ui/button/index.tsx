import Link from 'next/link';

type ButtonBaseProps = {
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
};

type ButtonAsLink = ButtonBaseProps & {
	href?: string;
	onClick?: never;
};

type ButtonAsButton = ButtonBaseProps & {
	href?: never;
	onClick?: () => void;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const Button = ({
	children,
	href,
	onClick,
	className = '',
	disabled = false,
	type = 'button',
}: ButtonProps) => {
	const baseStyles =
		'min-w-[180px] h-[40px] px-6 bg-black text-white text-lg font-medium rounded-md transition-all hover:bg-yellow-400 inline-flex items-center justify-center';
	const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';
	const combinedStyles = `${baseStyles} ${disabled ? disabledStyles : ''} ${className}`;
	const fontStyle = { fontFamily: "'Work Sans', sans-serif" };

	if (href) {
		return (
			<Link
				href={href}
				className={combinedStyles}
				style={fontStyle}
				aria-disabled={disabled}
				onClick={disabled ? (e) => e.preventDefault() : undefined}
			>
				{children}
			</Link>
		);
	}

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={combinedStyles}
			style={fontStyle}
		>
			{children}
		</button>
	);
};

export default Button;
