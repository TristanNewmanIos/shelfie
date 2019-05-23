let trades = require('../data/trades')

const readTrades = (req,res) =>{
    if (req.query.date){

        console.log(1)

        const filteredTrades = trades.map((trade)=>{

        })
        // res.json(trades)
    }else{
        res.json(trades)
    }
}

const addTrade = (req, res) =>{
    let newTrade = req.body
    console.log(req.body)
    trades.push(newTrade)
    res.json(trades)
}

const updateTrade = (req, res) =>{
    let updatedTrade = req.body
    trades[req.params.id] = updatedTrade
    res.json(trades)
}

const destroyTrade = (req, res) =>{
    const filteredTrades = trades.filter((trade, index)=>{
        // console.log("ID OF THE DELETED TRADE" + req.params.id)
        if(+req.params.id !== index){
            console.log(true)
            console.log(index)
            console.log(req.params.id)
            return trade
        }
    })

    trades = filteredTrades
    res.json(trades)
}

module.exports = {
    addTrade,
    updateTrade,
    destroyTrade,
    readTrades
}