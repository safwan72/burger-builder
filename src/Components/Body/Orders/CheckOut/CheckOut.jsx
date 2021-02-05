import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Spinner from "../../Spinner/Spinner";
import { connect } from "react-redux";
import axios from "axios";
import * as actionstorer from "../../../../Redux/actionstore";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalprice: state.totalPrice,
    purchasable: state.purchasable,
    token: state.token,
    userId: state.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetall: () => dispatch(actionstorer.resetingredients()),
  };
};

class CheckOut extends Component {
  state = {
    values: {
      oname: "",
      oaddress: "",
      omethod: "Cash On Delivery",
      ocomment: "",
    },
    isLoading: false,
    ismodalopen: false,
    modaltext: "",
  };
  changeHandler = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };
  // toggle=()=>{
  //   this.setState({
  //     ismodalopen:!this.state.ismodalopen
  //   })
  // }
  submitHandler = (e) => {
    this.setState({
      isLoading: true,
    });
    const orders = {
      order: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      userId: this.props.userId,
    };

    axios
      .post(
        "https://bohubrihi-burgerbuilder.firebaseio.com/orders.json?auth=" +
          this.props.token,
        orders
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoading: false,
            ismodalopen: true,
            modaltext: "Order Placed Succesfully",
          });
          this.props.resetall();
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          ismodalopen: true,
          modaltext: "Order Placing Error. Try Again",
        });
      });
    this.setState({
      values: {
        oname: "",
        oaddress: "",
        omethod: "Cash On Delivery",
        ocomment: "",
      },
    });
  };
  goBack = () => {
    this.props.history.goBack("/burgerbuilder");
  };
  render() {
    const form = (
      <div className="container text-center">
        <Form>
          <FormGroup>
            <Input
              type="text"
              name="oname"
              value={this.state.values.oname}
              id="ordername"
              placeholder="Enter Your Name Here"
              onChange={(e) => this.changeHandler(e)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="oaddress"
              id="orderaddress"
              value={this.state.values.oaddress}
              placeholder="Enter Your Address Here"
              onChange={(e) => this.changeHandler(e)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="select"
              name="omethod"
              id="ordermethod"
              value={this.state.values.omethod}
              onChange={(e) => this.changeHandler(e)}
            >
              <option defaultValue>Cash On Delivery</option>
              <option>Bkash</option>
              <option>Rocket</option>
              <option>Pay Via Card</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              type="textarea"
              name="ocomment"
              value={this.state.values.ocomment}
              id="exampleText"
              placeholder="Enter Comment Here"
              onChange={(e) => this.changeHandler(e)}
            />
          </FormGroup>
          <Button
            style={{ backgroundColor: "#D70F64", marginRight: "6px" }}
            onClick={(e) => this.submitHandler(e)}
            disabled={!this.props.purchasable}
          >
            Confirm Order
          </Button>
          <Button color="warning" onClick={this.goBack}>
            Cancel
          </Button>
        </Form>
      </div>
    );
    return (
      <>
        <h1 className="text-center my-4"> CheckOut Page </h1>
        <h4 className="text-center my-4">
          Total Price- {this.props.totalprice} BDT
        </h4>

        {this.state.isLoading ? <Spinner /> : form}
        <Modal isOpen={this.state.ismodalopen} onClick={this.goBack}>
          <ModalBody>{this.state.modaltext}</ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
