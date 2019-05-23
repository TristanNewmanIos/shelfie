import React from 'react';
import './Sorter.css'

const Sorter = (props) =>{
    return(
        <div className="sorter"
            onClick={()=>{
                props.filterDate(props.link)
                }
            }
        >
            {props.title}
            {/* props.link */}
        </div>
    )
}

export default Sorter