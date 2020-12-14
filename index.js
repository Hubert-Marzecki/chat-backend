const socketio = require('socket.io');
const cors = require('cors')
const http = require('http');

const {addUser, removeUser, getUser, getUsersInRoom } = require('./users')
const router = require('./router');

const PORT = 5000;

const app = require("express")();
app.use(cors())
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log("new user connected", socket.id);

    // .om listen to emiter
    socket.on('join', ({nick, room}, callback) => {
        const {error, user} = addUser( {id: socket.id, nick, room});
        if(error) return callback(error);


        socket.emit('message', {user: 'admin', text: `${user.nick} welcome in room: ${user.room}`});
        // broadcast.to(user.room) - send message to everyone besides specific user
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text:`${user.nick} joined the chat`});

        // connect user to room
        socket.join(user.room)

        callback({callbackData: `NODE: I combined given data! Here you go -  ${nick + room}?`})
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        // send message in specific room
        io.to(user.room).emit('message', {user: use.nick, text:message});
        callback();
    })


    socket.on("disconnect", () => {
        console.log("user left");
    });
});



app.use(router);
server.listen(PORT, () => console.log(`Sertver started - Port: ${PORT}`));