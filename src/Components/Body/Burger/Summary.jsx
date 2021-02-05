import React from 'react';
const Summary=(props)=>{
    let ingredients=props.ingredients,arraynull=null;
    arraynull= ingredients.map(item=>{
        return (
            <li key={Math.random()}>
                {item.type} : {item.amount}
            </li>
        )
    })
   
        return (
             <>
             <ul>
            {arraynull}
             </ul>
         
             </>
        );
    }

export default Summary;