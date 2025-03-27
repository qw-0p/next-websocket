import React from 'react'
import Button from './ui/button.ui';
import Avatar from './ui/avatar.ui';

const Header = () => {
	return (
		<div className='px-4 py-2 w-full flex justify-end min-h-[60px] bg-gray-400 border-2 border-gray-500 rounded-md'>
			<div className='flex'>
				<Avatar url="https://dummyjson.com/icon/emilys/128" />
				<Button type='submit' className='ml-5'>Sign out</Button>
			</div>
		</div>
	)
}

export default Header;