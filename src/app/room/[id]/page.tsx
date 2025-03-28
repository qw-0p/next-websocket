'use client'
import React, {useEffect, useState} from 'react';
import {socket} from "@/lib/socketClient";
import {useParams, useRouter} from "next/navigation";
import {useUserStore} from "@/store/user";
import QuestionRoom from "@/components/QuestionRoom";

export interface Question {
    id: number;
    question: string;
    options: string[];
}


const data: Question[] = [
    {
        "id": 1,
        "question": "What is your favorite color?",
        "options": [
            "Red",
            "Blue",
            "Green",
            "Yellow"
        ]
    },
    {
        "id": 2,
        "question": "What is your favorite animal?",
        "options": [
            "Dog",
            "Cat",
            "Bird",
            "Fish"
        ],
    },
    // {
    //     "id": 3,
    //     "question": "What is your favorite food?",
    //     "options": [
    //         "Pizza",
    //         "Burger",
    //         "Sushi",
    //         "Pasta"
    //     ]
    // },
    // {
    //     "id": 4,
    //     "question": "'A' is the most common letter used in the English language?",
    //     "options": [
    //         "True",
    //         "False"
    //     ]
    // }
]

const Room = () => {
    const [room, setRoom] = useState("");
    const userName = useUserStore((state) => state.userName)

    const params = useParams()
    const router = useRouter()


    useEffect(() => {
        if (!params.id) return;

        const roomId = params.id as string;
        setRoom(roomId);

        socket.emit('join_room', {room: roomId, username: userName});


        return () => {
            socket.off('user_joined');
            socket.emit('leave_room', {room, username: userName})
        }
    }, [params.id]);

    return (<div className="h-[100vh]">
        <h1 className="text-3xl self-center">Room: {room}</h1>
        <div className="w-full h-full flex justify-center">
            <QuestionRoom roomId={room} questions={data}/>
        </div>
    </div>)
};

export default Room;
