import React, { Component } from "react";
import { connect } from "react-redux";
import  Spinner  from "./../Spinner/Spinner";
import * as actionstore from "../../../Redux/actionstore";
import ShowOrders from './showOrders'
const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    ordersLoading:state.ordersLoading,
    token:state.token,
    userId:state.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadcomments: (token,userId) => dispatch(actionstore.fetchOrders(token,userId)),
  };
};
class Order extends Component {
  componentDidMount() {
    this.props.loadcomments(this.props.token,this.props.userId);
  }

  render() {
    let allorders = this.props.orders;
    let showorder=null;
    if(allorders.length!==0){
 
        showorder=allorders.map(item=>{
          return <ShowOrders orders={item} key={item.id}/>
        })
    }
    else{
      showorder=<p className='text-center my-5 p-5 display-4 mx-auto'> NO ITEMS TO DISPLAY</p>
    }

    return (
      <>
        <h1 className='text-center my-4'> Orders</h1>
        <div className="container my-4">
        <div className='row'>
        {(this.props.ordersLoading)?<Spinner/>:showorder}
        </div>
        </div>

      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
