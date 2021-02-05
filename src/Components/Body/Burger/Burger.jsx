import React from 'react';
import BurgerIngredients from '../Ingredients/BurgerIngredients';
import '../Body.css'
const Burger=(props)=>{

    let propsarray=props.ingredients.map(item=>{
        let ingredientsarray=[...Array(item.amount).keys()];
        return ingredientsarray.map(_=>{
            return <BurgerIngredients image={item.type} key={Math.random()}/>
        })
    }).reduce((arr,element)=>{
        return arr.concat(element);
    },[]);
    if(propsarray.length===0){
    propsarray=<p style={{textAlign:"center",fontSize:"20px",fontWeight:'bold'}}> Add Something Pervert</p>
    } 
        return (
             <>
             <div className='container mt-5 Burger'>
             <BurgerIngredients image="BurgerTop"/>
             {propsarray}
             <BurgerIngredients image="BurgerBottom"/>
             </div>
             </>
        );
    }

export default Burger;