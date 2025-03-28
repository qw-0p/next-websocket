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
        const activeRooms = new Set<string>();

        socket.on("join_room", ({ room, username }) => {
            const isNewRoom = !activeRooms.has(room);

            socket.join(room);
            console.log(`User ${username} joined room: ${room}`);

            socket.to(room).emit("user_joined", {
                username,
                message: `${username} joined the room`,
                timestamp: Date.now()
            });
            if (isNewRoom) {
                activeRooms.add(room);
                io.emit('room_created', room)
            }
        });


        socket.on("get_rooms", () => {
            const rooms = Array.from(io.sockets.adapter.rooms.keys());
            const userRooms = rooms.filter(room => {
                return room && !io.sockets.adapter.sids.get(room)
            })
            socket.emit('room_list', userRooms)
        })

        socket.on("answer_selected", (data) => {
            io.to(data.roomId).emit('update_answers', data);
        })


        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        })
    });

    httpServer.listen(port, () => {
        console.log(`Server running on http://${hostname}:${port}`);
    })
});
