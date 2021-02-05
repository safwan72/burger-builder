import React from 'react';
import BurgerTop from '../../../assets/images/top.png'
import BurgerBottom from '../../../assets/images/bottom.png'
import Cheese from '../../../assets/images/cheese.png'
import Meat from '../../../assets/images/meat.png'
import Salad from '../../../assets/images/salad.png'
import '../Body.css'


const BurgerIngredients=(props)=>{
    let selectedimage=null;
    switch (props.image) {
        case "BurgerTop":
             selectedimage=<img src={BurgerTop} alt="Burgertop"/>;
            break;
        case "BurgerBottom":
             selectedimage=<img src={BurgerBottom} alt="BurgerBottom"/>;
            break;
        case "Cheese":
             selectedimage=<img src={Cheese} alt="Cheese"/>;
            break;
        case "Meat":
             selectedimage=<img src={Meat} alt="Meat"/>;
            break;
        case "Salad":
             selectedimage=<img src={Salad} alt="Salad"/>;
            break;
    
        default:selectedimage=null
            break;
    }

        return (
             <div className='ingredient'>
             {selectedimage}
             </div>
        );
    }

export default BurgerIngredients;