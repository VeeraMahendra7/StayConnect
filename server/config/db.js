const mongoose = require('mongoose')
const initData = require('./data.js')
const Listing = require('../models/listingModel.js')

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB: ', conn.connection.host);
    } catch (error) {
        console.log("DB Error: ", error.message)
    }  
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data)
    console.log("data was initialized");
}

// initDB();

module.exports = connectToDB;