const express = require('express')
const controller = require('./controller')
const massive = require('massive')
require('dotenv').config()

const app = express()

app.use(express.json())

massive(process.env.CONNECTION_STRING)
    .then(db =>{
        app.set('db', db)
        console.log('Database connected')
})

app.listen(process.env.SERVER_PORT, () => console.log(`Listening on Port ${process.env.SERVER_PORT}`));