"use client"
import React from 'react'
import Button from './ui/button.ui';
import Avatar from './ui/avatar.ui';
import { useUserStore } from '@/store/user';
import {useRouter} from "next/navigation";
import Link from "next/link";


const Header = () => {
	const userName = useUserStore((state) => state.userName)
	const avatar = useUserStore((state) => state.avatar)
	const router = useRouter()
	const setUserName = useUserStore((state) => state.setUserName)
	const setAvatar = useUserStore((state) => state.setAvatar)

	const handleLogout = () => {
		setUserName('')
		setAvatar('')
		router.push('/auth')
	}

	const handleLogin = () => {
		router.push('/auth')
	}


	return (
		<div className='px-4 py-2 items-center w-full flex justify-between min-h-[60px] bg-gray-100 border-2 border-gray-300 rounded-md'>
			<div>
				<Link href={'/'} className="align-middle">HOME</Link>
			</div>
			{
				userName ? <div className="flex">
						<Avatar url={avatar} width={50} />
						<Button type='submit' onClick={handleLogout} className='ml-5'>Sign out</Button>
					</div>
					: <Button type='submit' onClick={handleLogin}  className='ml-5'>Sign in</Button>
			}
		</div>
	)
}

export default Header;
