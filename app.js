const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()

//use dotenv
dotenv.config()

//schema
let Schema = mongoose.Schema
const testSchema = new Schema({
    name: String,
    email: String,
    phone: String,
})

//model
let TestContacts = mongoose.model('Contact', testSchema)

//routes
app.get('/', (req, res) => {
    let mynewdata = new TestContacts({
        name: 'Pabel',
        phone: '01911919191',
        email: 'jhpabel@gmail.com',
    })
    mynewdata
        .save()
        .then((t) => {
            res.json(t)
        })
        .catch((e) => {
            console.log(e)
        })
})

const PORT = process.env.PORT || 5000

//connect mongoDB & start server
mongoose
    .connect(`${process.env.mongoURI}`, {
        useNewUrlParser: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
    })
    .catch((e) => {
        console.log(e)
    })
