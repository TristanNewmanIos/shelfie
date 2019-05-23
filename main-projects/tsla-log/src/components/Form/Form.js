import React, {Component} from 'react'
import './Form.css'
import axios from 'axios';

class Form extends Component{
    constructor(){
        super()
        this.state={
            inputPrice: 0,
            inputPeriod: 0,
            inputMinPrice: 0,
            inputMaxPrice: 0,
            inputTradeType: 0,
            inputLimit: 0
        }
    }

    //INPUT UPDATES
    updatePrice(e){
        this.setState({inputPrice: e.target.value},()=>{console.log(this.state.inputPrice)})
    }
    updatePeriod(e){
        this.setState({inputPeriod: e.target.value},()=>{console.log(this.state.inputPeriod)})
    }
    updateMin(e){
        this.setState({inputMinPrice: e.target.value},()=>{console.log(this.state.inputMinPrice)})
    }
    updateMax(e){
        this.setState({inputMaxPrice: e.target.value},()=>{console.log(this.state.inputMaxPrice)})
    }
    updateType(e){
        this.setState({inputTradeType: e.target.value},()=>{console.log(this.state.inputTradeType)})
    }
    updateLimit(e){
        this.setState({inputLimit: e.target.value},()=>{console.log(this.state.inputLimit)})
    }

    //NETWORKING CALLS
    addTrade(){
        let { inputPrice, inputPeriod, inputMinPrice, inputMaxPrice, inputTradeType, inputLimit} = this.state

        const newTrade = {
            price: inputPrice,
            estPeriod: inputPeriod,
            isBuy: inputTradeType !== "buy" ? false : true,
            date: new Date().toDateString(),
            tradePoint: inputLimit,
            inputMaxPrice,
            inputMinPrice

        }
        console.log(newTrade)
        axios.post('http://localhost:5050/api/stocks', newTrade)
        .catch(error=>{
            console.log(error)
            alert("There was an error, check your connectio. More details in console.")
        })
    }

    updateTrade(id){

        let { inputPrice, inputPeriod, inputMinPrice, inputMaxPrice, inputTradeType, inputLimit} = this.state

        const updatedTrade = {
            price: inputPrice,
            estPeriod: inputPeriod,
            isBuy: inputTradeType !== "buy" ? false : true,
            date: new Date().toDateString(),
            tradePoint: inputLimit,
            inputMaxPrice,
            inputMinPrice

        }
        
        axios.put("http://localhost:5050/api/stock/"+id, updatedTrade)
        .then(response=>
            this.setState({reportList: response.data})
        ).catch(error=>{
            console.log(error)
            alert("There was an error, check your connectio. More details in console.")
        })

        this.setState({isEditing: false})
    }

    render(){

        

        return(<form className="form">
                <input className="price-input" type="number" placeholder="trade price" onChange={e =>{this.updatePrice(e)}}></input>
                <input className="period-input" type="number" placeholder="cycle period in days" onChange={e=>{this.updatePeriod(e)}}></input>
                <input className="min-price-input" type="number" placeholder="period min price" onChange={(e)=>{this.updateMin(e)}}></input>
                <input className="max-price-input" type="number" placeholder="period max price" onChange={(e)=>{this.updateMax(e)}}></input>
                <p>buy</p>
                <input className="type-input" type="radio" name="trade-type" checked={true} value="buy" onChange={(e)=>{this.updateType(e)}}></input>
                <p>sell</p>
                <input className="type-input" type="radio" name="trade-type" value="sell" onChange={(e)=>{this.updateType(e)}}></input>
                <p>limit percent</p>
                <select name="limit-percent" onChange={(e)=>{this.updateLimit(e)}}>
                    <option value=".04">4%</option>
                    <option value=".05">5%</option>
                    <option value=".06">6%</option>
                    <option value=".07">7%</option>
                    <option value=".08">8%</option>
                    <option value=".09">9%</option>
                    <option value=".10">10%</option>
                </select>
                <button type="submit" disabled={this.props.editing} onClick={()=>{this.addTrade()}}>submit</button>
                <button type="submit" disabled={!this.props.editing} onClick={()=>{this.updateTrade(this.props.editIndex)}}>submit edit</button>
                <button type="reset">reset</button>
            </form>
        )   
    }
    
}

export default Form;