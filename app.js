const express = require('express')
const router = express.Router()

const app = express()

//server on root
app.get('/', (req, res) => res.send("hello I'm express server!"))

//server sendHtmlFile
app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/src/index.html')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
