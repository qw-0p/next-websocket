import { cn } from '@/lib/utils'
import React from 'react'


interface Props {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({ className, type, children }) => {
	return (
		<button type={type || 'button'} className={cn('px-4 py-2 bg-blue-500 rounded-lg', className)}>
			{children}
		</button>
	)
}

export default Button