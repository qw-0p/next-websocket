import React from 'react'

interface Props {
	className?: string
	type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
	placeholder?: string
	value?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<Props> = ({ type, placeholder, value, onChange }) => {
	return <input
		value={value}
		placeholder={placeholder}
		onChange={onChange}
		className='border-2 w-full border-blue-300 px-4 py-2 rounded-lg focus:outline-none'
		type={type || 'text'}
	/>
}

export default Input
