'use client'
import React, {useState, useEffect, useId} from 'react'
import {socket} from "@/lib/socketClient";
import Card from "@/components/shared/ui/card";
import Link from "next/link";

const Home = () => {
  const [rooms, setRooms] = useState<number[]>([])


  useEffect(() => {
      socket.emit('get_rooms')

      socket.on('room_list', (data) => {
          setRooms(data)
      })

      socket.on('room_created', (data) => {
          console.log('room_created', data)

          setRooms((prev) => [...prev, data])
      })
      return () => {
          socket.off('room_created')
          socket.off('room_list')
      }
  }, []);

  return (
      <div>
          {rooms.map((room, index) => (
              <div key={index}>
                  <Link href={`/room/${room}`}>
                    <Card>{room}</Card>
                  </Link>
              </div>
          ))}
      </div>
  )
}

export default Home
