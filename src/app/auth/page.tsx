'use client'
import Card from '@/components/shared/ui/card.ui'
import Button from '@/components/shared/ui/button.ui'
import Input from '@/components/shared/ui/input.ui'
import React from 'react'
import { useUserStore } from '@/store/user';
import { socket } from "@/lib/socketClient";
import {useRouter} from "next/navigation";


const Auth = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [room, setRoom] = React.useState('')
    const [error, setError] = React.useState('')
    const router = useRouter()

    const setUserName = useUserStore((state) => state.setUserName)
    const setAvatar = useUserStore((state) => state.setAvatar)



    const handleLogin = async (e: React.FormEvent) => {
        setError('')
        e.preventDefault()
        try {
            const data = await fetch('https://dummyjson.com/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            }) as Response || {message: 'string'}

            const user = await data.json()
            if (data.status === 200) {
                setUserName(user.username)
                setAvatar(user.image)
                if (room && username) {
                    router.push(`/room/${room}`)
                    socket.emit("join_room", {room, username })
                }
            } else {
                setError(user.message)
            }
        } catch(e) {
            console.log(e)
        }
    }


    return (
        <div className='flex justify-center items-center h-screen'>
            <Card>
                <form onSubmit={handleLogin} className="flex gap-4 flex-col">
                    <Input type='text' placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input type='text' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input type='text' placeholder='Enter room number' value={room} onChange={(e) => setRoom(e.target.value)} />
                    <Button type="submit" className="pb-2">Sign in</Button>
                    {error && <p className='text-red-500'>{error}</p>}
                </form>
            </Card>
        </div>
    )
}

export default Auth
