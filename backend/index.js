const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3000
const Message = require('./models/message');
require('dotenv').config({ path: './.env' });

app.use(cors())

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

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})