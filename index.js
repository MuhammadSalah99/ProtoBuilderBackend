const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http')
const cookieParer = require('cookie-parser')
const db = require("./models")
const userRouter = require("./routes/user.route.js");
const blogRouter = require('./routes/blog.route.js');
const projectRouter = require('./routes/project.route.js')
const cookieParser = require("cookie-parser");
const messageRouter = require('./routes/message.route.js')
const { Server } = require('socket.io');
const app = express();
const Message = db.messages

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({
    origin: '*',
}));

db.sequelize.sync({force: true })
    .then(() => {
        console.log("synced db")
    })
    .catch((err) => {
        console.log("failed to sync db: " + err.message)
    })
const chatRooms = {};

io.on('connection', (socket) => {
    socket.on('joinRoom', (roomID) => {
        // Create the chat room if it doesn't exist
        if (!chatRooms[roomID]) {
            chatRooms[roomID] = [];
        }

        // Add the socket to the chat room
        chatRooms[roomID].push(socket);

        // Emit an event to notify the user that they have joined the room
        socket.emit('roomJoined', roomID);
    });

    socket.on('sendMessage', async (data) => {
        const { roomID, message, senderId, receiverId } = data;

        // Save the message to the database
        try {
            const savedMessage = await Message.create({
                text: message,
                senderId,
                receiverId,
            });

            // Broadcast the message to all sockets in the chat room
            chatRooms[roomID].forEach((socket) => {
                socket.emit('newMessage', savedMessage);
            });
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        // Remove the socket from the chat room when the user disconnects
        for (const roomID in chatRooms) {
            const sockets = chatRooms[roomID];
            const index = sockets.indexOf(socket);
            if (index !== -1) {
                sockets.splice(index, 1);
                break;
            }
        }
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to ProtoBuilder." });
});

app.use('/api/users', userRouter)
app.use('/api', blogRouter)
app.use('/api', projectRouter)
app.use('/api/msg', messageRouter)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

