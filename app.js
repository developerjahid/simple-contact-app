const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//call contacts model
const Contact = require('./Contact')

const app = express()

//use dotenv
dotenv.config()

//init middleware
app.use(express.json({ extended: false }))

//all routes
//get all contact routes
app.get('/', (req, res) => {
    Contact.find()
        .then((contacts) => {
            res.json(contacts)
        })
        .catch((e) => {
            console.log(e)
            res.json({
                message: 'Error Occurred',
            })
        })
})
//create contact
app.post('/', (req, res) => {
    let { name, phone, email } = req.body
    let contact = new Contact({
        name,
        phone,
        email,
    })
    contact
        .save()
        .then((c) => {
            res.json(c)
        })
        .catch((e) => {
            console.log(e)
            res.json({
                message: 'Error Occurred',
            })
        })
})
//get one contact with id
app.get('/:id', (req, res) => {
    let { id } = req.params
    Contact.findById(id)
        .then((contact) => {
            res.json(contact)
        })
        .catch((e) => {
            console.log(e)
            res.json({
                message: 'Error Occurred',
            })
        })
})
//update contact by id routes
app.put('/:id', (req, res) => {
    let { name, phone, email } = req.body
    let { id } = req.params
    Contact.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                name,
                email,
                phone,
            },
        }
    )
        .then((contact) => {
            res.json(contact)
        })
        .catch((e) => {
            console.log(e)
            res.json({
                message: 'Error Occurred',
            })
        })
})
//delete contact by id routes
app.delete('/:id', (req, res) => {
    let { id } = req.params
    Contact.findOneAndDelete({ _id: id })
        .then((contact) => {
            res.json(contact)
        })
        .catch((e) => {
            console.log(e)
            res.json({
                message: 'Error Occurred',
            })
        })
})
//routes finished

const PORT = process.env.PORT || 5000

//connect mongoDB & start server
mongoose
    .connect(`${process.env.mongoURI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
    })
    .catch((e) => {
        console.log(e)
    })
