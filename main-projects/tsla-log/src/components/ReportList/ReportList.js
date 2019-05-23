import React, {Component} from 'react'
import Report from '../../components/Report/Report'
import Form from '../../components/Form/Form'
import axios from 'axios'

class ReportList extends Component{
    constructor(props){
        super(props)
        this.state={
            reportList: props.reportList,
            isEditing: false,
            editIndex: ''
        }
        this.deleteTrade = this.deleteTrade.bind(this) 
        this.enableEdit = this.toggleEdit.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:5050/api/stocks').then(response =>{
            console.log("Got the stock data")
            this.setState({reportList: response.data})
        // console.log(this.state.reportList)
        }).catch((error)=>{
            console.log(error)
        })
    }

    addTrade(trade){
        this.setState({reportList: [...this.state.reportList, trade]})
        .then(response=>
            this.setState({reportList: response.data})
        ).catch(error=>{
            console.log(error)
            alert("There was an error, check your connectio. More details in console.")
        })
    }

    deleteTrade(index){
        axios.delete("http://localhost:5050/api/stock/"+index)
        .then(response=>
            this.setState({reportList: response.data})
        ).catch(error=>{
            console.log(error)
            alert("There was an error, check your connectio. More details in console.")
        })

        // console.log(index)
    }

    toggleEdit(index){
        console.log(index)
        if(!this.state.isEditing){
            this.setState({isEditing: true})
            this.setState({editIndex: index})
        }
        else{
            this.setState({isEditing: false})
            this.setState({editIndex: ''})
        }
        
    }
    
    render(){
        const reports = this.state.reportList.map((report, index)=>{
            // console.log({index})
            if(this.state.isEditing && (index === +this.state.editIndex)){
                
                return <Report 
                    key={index}
                    id={index}
                    price={"Price: " + report.price + " "}
                    estPeriod={"Period: " + report.estPeriod + " days "}
                    date={"Trade date: "+ report.date}
                    isBuy={report.isBuy}
                    tradePoint={"Trade point "+ report.tradePoint}
                    delete= {this.deleteTrade}
                    edit= {this.enableEdit}
                />
                
            }
            else if(this.state.isEditing){
                return <div key={index}></div>
            }
            else{
                return <Report 
                    key={index}
                    id={index}
                    price={"Price: " + report.price + " "}
                    estPeriod={"Period: " + report.estPeriod + " days "}
                    date={"Trade date: "+ report.date}
                    isBuy={report.isBuy}
                    tradePoint={"Trade point "+ report.tradePoint}
                    delete= {this.deleteTrade}
                    edit= {this.enableEdit}
                />
            }
            
            
        })
        // console.log(reports)

        return(
            
            <section className="report-list">
                <Form 
                    editing={this.state.isEditing} 
                    addTrade={this.addTrade}
                    editIndex={this.state.editIndex}/>
                {reports}
            </section>
           
        )
    }
}

export default ReportList