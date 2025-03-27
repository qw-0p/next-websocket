'use client'
import React, {useEffect, useState} from 'react';
import {socket} from "@/lib/socketClient";
import Message from "@/components/Message";
import ChatForm from "@/components/ChatForm";
import {useParams, useRouter} from "next/navigation";
import {useUserStore} from "@/store/user";

const Room = () => {
    const [messages, setMessages] = useState<{ sender: string, message: string }[]>([]);
    const [room, setRoom] = useState("");
    const userName = useUserStore((state) => state.userName)

    const params = useParams()
    const router = useRouter()



    useEffect(() => {
        if(!userName) {
            router.push('/auth')
        }
        setRoom(params.id as string)

        socket.on("message", (data) => {
            setMessages(prev => [...prev, data])
        })



        socket.on("user_joined", (message) => {
            setMessages(prev => [...prev, {sender: "system", message: message}])
            socket.emit("join_room", {room, username: userName})
        })
        return () => {
            socket.off("user_joined");
            socket.off("message")
        }
    }, [room, userName]);

    const handleSendMessage = (message: string) => {
        const data = {room, message, sender: userName}

        setMessages(prev => [...prev, {sender: userName, message}]);
        socket.emit("message", data)
    }

    return (
        <div className="flex mt-24 justify-center w-full">
                <div className="w-full max-w-3xl mx-auto ">
                    <h1 className="mb-4 text-2xl">Room: {room}</h1>
                    <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-blue-200 border-2 border-blue-300 rounded-lg">
                        {messages.map((message, index) => <Message
                                key={index}
                                sender={message.sender}
                                message={message.message}
                                isOwnMessage={message.sender === userName}
                            />
                        )}
                    </div>
                    <ChatForm onSendMessage={handleSendMessage} />
                </div>
        </div>)
};

export default Room;
