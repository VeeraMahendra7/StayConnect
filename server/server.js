const express = require('express')
const connectToDB = require('./config/db.js');
const Listing = require('./models/listingModel.js');
require('dotenv').config();

const app = express()
app.use(express.json())

connectToDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/testListing', async (req, res) => {
    let sample = new Listing({
        title: "My New Villa",
        desc: "By the Beach",
        price: 1200,
        location: "Mumbai, Goa",
        country: "India"
    })
    await sample.save();
    console.log(sample);
    res.send("sample saved")
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})