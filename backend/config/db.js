const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDb Connected Successfully")
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1); // Agar connect nahi hua toh app ko band kar do
    }
}

module.exports = connectDB