const express = require('express')
const connectToDB = require('./config/db.js')
require('dotenv').config();

const app = express()
app.use(express.json())

connectToDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})