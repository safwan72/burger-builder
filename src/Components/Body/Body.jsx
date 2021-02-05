import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './Body.css'
import BurgerMenu from './BurgerMenu';
import Orders from './Orders/Order'
import CheckOut from './Orders/CheckOut/CheckOut'
import Authentication from './Authentication/Authentication';
import { connect } from "react-redux";
import * as authactions from '../../Redux/authactions'
import Logout from './Authentication/Logout';
const mapStateToProps=state=>{
  return{
    token:state.token
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    checkforauth:()=>dispatch(authactions.authcheck())
  }
}


class Body extends Component {
  componentDidMount(){
    this.props.checkforauth();
}
 render(){
  let shows=null;
  if(this.props.token!==null){
    shows=(
      <Switch>
      <Route path='/burgerbuilder' exact component={BurgerMenu}/>
      <Route path='/orders' exact component={Orders}/>
      <Route path='/checkout' exact component={CheckOut}/>
      <Route path='/logout' exact component={Logout}/>
      <Redirect from='/' to='/burgerbuilder'/>
      </Switch>
    )
  }
  else {
    shows=(
      <Switch>
      <Route path='/signup' exact component={Authentication}/>
      <Redirect  to='/signup'/>
      </Switch>
    )
  }
  
    return (
     <>
      {shows}
     </>
    );
 }

}

export default connect(mapStateToProps,mapDispatchToProps)(Body);
