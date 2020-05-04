const Contact = require('../models/Contact')

exports.getAllContact = (res, req) => {}

exports.getSingleContact = (res, req) => {}

exports.createContact = (res, req) => {
    let { name, phone, email } = req.body
    let contact = new Contact({
        name,
        phone,
        email,
    })
    console.log(contact)
    res.json({
        message: 'Something',
    })
}

exports.updateContact = (res, req) => {}

exports.deleteContact = (res, req) => {}
