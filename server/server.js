const express = require('express')
const connectToDB = require('./config/db.js');
const Listing = require('./models/listingModel.js');
const path = require('path')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
require('dotenv').config();

const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "/public")))
app.use(methodOverride("_method"))
app.use(express.json())
app.engine("ejs", ejsMate)

connectToDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/listings', async(req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", {allListings})
})

app.get('/listings/new', (req, res) => {
    res.render("listings/new.ejs")
})

app.get('/listings/:id', async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing})
})

app.post('/listings', async(req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings')
})

app.get('/listings/:id/edit', async(req, res) => {
    let {id} = req.params
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs", {listing});
})

app.put('/listings/:id', async(req, res) => {
    let {id} = req.params
    await Listing.findByIdAndUpdate(id, {...req.body.listing})
    res.redirect(`/listings/${id}`)
})

app.delete('/listings/:id', async(req, res) => {
    let {id} = req.params
    await Listing.findByIdAndDelete(id)
    res.redirect('/listings')
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})