import axios from 'axios'

export const getMessages = async () => {
    const res = await axios.get("http://localhost:3000/api/messages")
    return res.data
}