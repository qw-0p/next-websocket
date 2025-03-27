import {createServer} from "node:http";
import next from "next";
import {Server} from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({dev, hostname, port});

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer);
    io.on("connection", (socket) => {
        socket.on("join_room", ({room, username}) => {
            socket.join(room);
            console.log(`User ${username} joined room: ${room}`);
            socket.to(room).emit("user_joined", `${username} joined the room`);

            if (room) io.emit('room_created', room)

        });

        socket.on("get_rooms", () => {
            const rooms = Array.from(io.sockets.adapter.rooms.keys());
            const userRooms = rooms.filter(room => !io.sockets.adapter.sids.get(room))

            socket.emit('room_list', userRooms)
        })

        socket.on("message", ({room, message, sender}) => {
            console.log(`Message from ${sender} in room ${room}: ${message}`);
            socket.to(room).emit("message", {sender, message})
        })

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        })
    });

    httpServer.listen(port, () => {
        console.log(`Server running on http://${hostname}:${port}`);
    })
});
