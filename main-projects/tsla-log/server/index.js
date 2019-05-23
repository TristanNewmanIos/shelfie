const express = require('express')
const app = express()
const cors = require('cors')
const tradeController = require("./controllers/tradeController")

app.use(express.json())
app.use(cors())

app.get('/api/stocks',tradeController.readTrades)
app.post('/api/stocks',tradeController.addTrade)
app.put('/api/stock/:id',tradeController.updateTrade)
app.delete('/api/stock/:id',tradeController.destroyTrade)

app.listen(5050, ()=>{
    console.log("listening on localhost:5050")
})

