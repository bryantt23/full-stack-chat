import axios from 'axios'

export const getMessages = async (params = {}) => {
    const res = await axios.get("http://localhost:3000/api/messages", { params })
    return res.data
}

export const sendMessage = async (name, message) => {
    const res = await axios.post("http://localhost:3000/api/messages", { name, message })
    return res.data
}