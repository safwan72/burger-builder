import * as actions from "./actiontypes";
const TOTAL_PRICES = {
  Cheese: 30,
  Salad: 10,
  Meat: 50,
};
const initstate = {
  ingredients: [
    { type: "Cheese", amount: 0 },
    { type: "Salad", amount: 0 },
    { type: "Meat", amount: 0 },
  ],
  orders: [],
  ordersLoading: false,
  totalPrice: 0,
  purchasable: false,
  token:null,
  userId:null,
  authloading:false,
  authloadingfailedmessage:null,
  authloadingfailed:false
};
const Reducer = (state = initstate, action) => {
  const ingredients = [...state.ingredients];
  switch (action.type) {
    case actions.ADD_INGREDIENTS:
      ingredients.forEach((i) => {
        if (i.type === action.payload) {
          i.amount++;
        }
      });
      return {
        ...state,
        ingredients: ingredients,
        totalPrice: state.totalPrice + TOTAL_PRICES[action.payload],
        authloadingfailedmessage:null,

      };
    case actions.REMOVE_INGREDIENTS:
      ingredients.forEach((i) => {
        if (i.type === action.payload) {
          if (i.amount <= 0) return state;
          i.amount--;
        }
      });
      return {
        ...state,
        ingredients: ingredients,
        totalPrice: state.totalPrice - TOTAL_PRICES[action.payload],
      };
    case actions.PURCHASABLE:
      const totalsum = state.ingredients.reduce((sum, element) => {
        return sum + element.amount;
      }, 0);
      return {
        ...state,
        purchasable: totalsum > 0,
      };
    case actions.RESET:
      return {
        ...state,
        ingredients: [
          { type: "Cheese", amount: 0 },
          { type: "Salad", amount: 0 },
          { type: "Meat", amount: 0 },
        ],
        totalPrice: 0,
        purchasable: false,
      };
    case actions.ORDERS_LOADING:
      return {
        ...state,
        ordersLoading: true,
        orders: [],
      };
    case actions.ORDERS_LOADED:
      let orders = [];
      for (let key in action.payload) {
        orders.push({
          ...action.payload[key],
          id: key,
        });
      }
      return {
        ...state,
        ordersLoading: false,
        orders: orders,
        authloadingfailedmessage:null,
      };
      case actions.AUTH_SUCCESS:
        return{
          ...state,
          token:action.payload.token,
          userId:action.payload.userId,
          authloadingfailedmessage:"Succesfully Loggedin",
        }
        case actions.LOG_OUT:
          return{
            ...state,
            token:null,
            userId:null,
            authloadingfailedmessage:null,
          }
          case actions.AUTH_LOADING:
            return{
              ...state,
              authloading:action.payload
            }
            case actions.AUTH_FAILED:
              return{
                ...state,
                authloadingfailedmessage:action.payload,
              }
    default:
      return state;
  }
};
export default Reducer;
