const mongoose = require('mongoose')

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB: ', conn.connection.host);
    } catch (error) {
        console.log("DB Error: ", error.message)
    }  
}

module.exports = connectToDB;