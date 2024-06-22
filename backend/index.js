const express = require("express")
const cors = require("cors")
const app = express()
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

const addMessage = async (res, name, message) => {
    if (!name || !message) {
        return res.state(400).json({ message: "Name and message are required" })
    }

    try {
        const newMessage = new Message({ name, message })
        await newMessage.save();
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({ message: 'Error saving message', error });
    }
}

app.post("/api/messages", async (req, res) => {
    const { name, message } = req.body
    return addMessage(res, name, message)
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
