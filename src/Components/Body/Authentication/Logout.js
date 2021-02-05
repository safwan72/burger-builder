import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../Redux/authactions'
import {connect} from 'react-redux'

const mapDispatchToProps=dispatch=>{
    return{
        logout:()=>dispatch(actions.logout())
    }
}

class LogOut extends Component{
componentDidMount(){
    this.props.logout();
}
    render(){
        return(

            <Redirect from='/logout' to='/' />
        )
        
    }
}
export default connect(null,mapDispatchToProps)(LogOut);