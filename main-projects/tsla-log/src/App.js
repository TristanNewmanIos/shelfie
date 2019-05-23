import React, {Component} from 'react';
import './App.css';
import ReportList from './components/ReportList/ReportList'
import NavBar from './components/NavBar/NavBar'
import axios from 'axios'

class App extends Component{
  constructor(){
    super()
    this.state={
      filterDate: null,
      reportList: []
    }
    this.filterDate = this.filterDate.bind(this)
    this.getTrades = this.getTrades.bind(this)
  }

  componentDidMount(){
    
    axios.get('http://localhost:5050/api/stocks').then(response =>{
      console.log("Got the stock data")
      this.setState({reportList: response.data})
      console.log(this.state.reportList)
    }).catch((error)=>{
        console.log(error)
    })
  }

  componentDidUpdate(){
    console.log(123)
  }

  filterDate(date){
    let filterMargin = new Date().getDate()
    let filteredDay = new Date()

    if(date === 'last week'){
      filterMargin -= 7
    }
    else if (date === 'last 2 weeks'){
      filterMargin -= 14
    }
    else if (date === 'last month'){
      filterMargin -= 30
    }

    this.setState({filterDate: filterMargin},()=>{this.getTrades()})
    
  }

  // resetFilter(){
  //   this.setState({filterDate: null})
  // }

  getTrades(){
    console.log("getting trades")
    console.log(this.state.filterDate)

    if(this.state.filterDate){
      console.log("before networking")
      axios.get('http://localhost:5050/api/stocks/?date='+this.state.filterDate).then(response =>{
        console.log("Got the stock data")
        this.setState({reportList: response.data})
        console.log(this.state.reportList)
      }).catch((error)=>{
          console.log(error)
      })
    }
    
    this.setState({filterDate: null})
  }

  render(){

    return (
      <div className="App">
        <NavBar 
          filterDate={this.filterDate}/>

        <ReportList 
          filterDate={this.state.filterDate}
          reportList= {this.state.reportList}
          getTrades={this.getTrades}/>
      </div>
    );
  }
  
}

export default App;
