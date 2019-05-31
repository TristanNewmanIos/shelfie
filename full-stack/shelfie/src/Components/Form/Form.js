import React, {Component} from 'react'

class Form extends Component{
    constructor(){
        super()
        this.state = {
            name: "",
            url: "",
            price: 0.0
        }
    }

    updateName(name){
        this.setState({name})
    }
    
    updateURL(url){
        this.setState({url})
    }

    updatePrice(price){
        this.setState({price})
    }

    cancelHandler(){
        this.setState({name: ''})
        this.setState({url: ''})
        this.setState({price: 0.0})
    }

    render(){

        

        return(<form className='form'>
            <input id="product-name" placeholder="product name" onChange={(e)=>{this.updateName(e.target.value)}} text={this.state.name}></input>
            <input id="product-url" placeholder="image url" onChange={(e)=>{this.updateURL(e.target.value)}}></input>
            <input id="product-price" placeholder="19.99" onChange={(e)=>{this.updatePrice(e.target.value)}}></input>
            <button id="cancel" type='reset'>Cancel</button>
            <button id="add">Add</button>
        </form>)
    }
}

export default Form