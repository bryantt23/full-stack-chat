// Load environment variables from .env file
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

// Define the Message schema
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: { type: String, required: true },
    name: { type: String, required: true, minLength: 2 },
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

// Connect to the MongoDB database
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error('Error: MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');

    // Define the messages to insert
    const messages = [
        { name: "John", message: "Hi" },
        { name: "Jane", message: "Hello how are you?" },
        { name: "John", message: "I am hungry" }
    ];

    // Insert the messages into the database
    Message.insertMany(messages)
        .then((docs) => {
            console.log('Messages inserted:', docs);
            mongoose.connection.close();
        })
        .catch((error) => {
            console.error('Error inserting messages:', error);
            mongoose.connection.close();
        });

}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
