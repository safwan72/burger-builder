import axios from 'axios';
import * as actiontypes from './actiontypes';


export const addingredients=item=>{
    return{
        type:actiontypes.ADD_INGREDIENTS,
        payload:item
    }
}

export const removeingredients=item=>{
    return{
        type:actiontypes.REMOVE_INGREDIENTS,
        payload:item
    }
}
export const purchasable=()=>{
    return{
        type:actiontypes.PURCHASABLE,
    }
}
export const resetingredients=()=>{
    return{
        type:actiontypes.RESET,
    }
}

export const ordersloaded=orders=>{
    return{
        type:actiontypes.ORDERS_LOADED,
        payload:orders
    }
}
export const ordersloading=()=>{
    return{
        type:actiontypes.ORDERS_LOADING,
    }
}

export const fetchOrders=(token,userId)=>dispatch=>{
    dispatch(ordersloading());
const param='&orderBy="userId"&equalTo="'+userId+'"' 
    axios.get('https://bohubrihi-burgerbuilder.firebaseio.com/orders.json?auth='+token+param)
    .then(response=>{
        // console.log(response.data)
        dispatch(ordersloaded(response.data))
    })
    // .then(orders=>dispatch(ordersloaded(orders)))
}

