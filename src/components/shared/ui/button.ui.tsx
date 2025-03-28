import { cn } from '@/lib/utils'
import React from 'react'


interface Props {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({ className, onClick, type, children }) => {
	return (
		<button onClick={onClick} type={type || 'button'} className={cn('px-4 py-2 bg-blue-200 border-2 border-blue-300 rounded-lg cursor-pointer', className)}>
			{children}
		</button>
	)
}

export default Button
