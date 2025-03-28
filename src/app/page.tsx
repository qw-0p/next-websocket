'use client'
import React, {useState, useEffect} from 'react'
import {socket} from "@/lib/socketClient";
import Card from "@/components/shared/ui/card.ui";
import Link from "next/link";
import {Events} from "@/constants/events.mts";
import Button from "@/components/shared/ui/button.ui";

const Home = () => {
  const [rooms, setRooms] = useState<number[]>([])


  useEffect(() => {
    socket.emit('get_rooms')

    socket.on('room_list', (data) => {
      setRooms(data)
    })

    socket.on('room_created', (data) => {
      setRooms((prev) => [...prev, data])
    })
    return () => {
      socket.off('room_created')
      socket.off('room_list')
    }
  }, []);

  return (
      <div className="py-8 px-4 grid grid-cols-4 gap-4">
        {rooms.map((room, index) => (
            <div key={index}>
              <Link href={`/room/${room}`}>
                <Card className="text-center">{room}</Card>
              </Link>
            </div>
        ))}
      </div>
  )
}

export default Home
