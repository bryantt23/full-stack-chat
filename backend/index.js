const express = require("express")
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/api/messages", (req, res) => {
    const messages = [
        { id: 1, name: "John", message: "Hi" },
        { id: 2, name: "Jane", message: "Hello how are you?" },
        { id: 3, name: "John", message: "I am hungry" }
    ];
    res.json(messages)
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})