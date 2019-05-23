import React from 'react'
import './Report.css'

const Report = (props) =>{
    let index = props.id

    return <article className="report">
        <p>{props.price}</p>
        <p>{props.estPeriod}</p>
        <p>{props.date}</p>
        <p>{props.isBuy}</p>
        <p>{props.tradePoint}</p>
        <button 
            className="form-btn" 
            id="edit"
            onClick={()=> props.edit(index)}>
            
            <img 
                alt="edit icon" 
                width="25px" 
                height="25px" 
                src="https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png">
            </img>
        </button>
        <button 
            className="form-btn" 
            id="delete"
            onClick={()=> props.delete(index)}>
            <img 
                alt="edit icon" 
                width="25px" 
                height="25px" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Zhk2EBZdAgpa5GJOWXIzeXvOihdPs8yitorxzKYWniwuIdrvRg">
            </img>
        </button>
        {props.children}


    </article>    
}

export default Report;