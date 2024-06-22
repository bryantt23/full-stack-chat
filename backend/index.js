const express = require("express")
const http = require("http")
const cors = require("cors")
const WebSocket = require("ws")

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const PORT = 3000
const Message = require('./models/message');
require('dotenv').config({ path: './.env' });

app.use(cors())
app.use(express.json())

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const mongoDB = process.env.MONGODB_URI

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/api/messages", async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 })
        res.json(messages)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error })
    }
})

const addMessage = async (name, message) => {
    if (!name || !message) {
        throw new Error("Name and message are required")
    }

    const newMessage = new Message({ name, message })
    await newMessage.save();
    return newMessage
}

app.post("/api/messages", async (req, res) => {
    const { name, message } = req.body
    try {
        const newMessage = await addMessage(name, message);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

wss.on("connection", (ws) => {
    console.log('A user connected');

    // Listen for new messages from the client
    ws.on('message', async (msg) => {
        try {
            const { name, message } = JSON.parse(msg)
            const newMessage = await addMessage(name, message)
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(newMessage))
                }
            })
        } catch (error) {
            ws.send(JSON.stringify({ error: error.message }))
        }
    })

    ws.on("close", () => {
        console.log('A user disconnected');
    })
})

server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
