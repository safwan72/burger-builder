import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controller from "./Ingredients/Controller";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Summary from "./Burger/Summary";
import { connect } from "react-redux";
import * as actionstorer from "../../Redux/actionstore";

const mapstateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addingredients: (type) => {
      dispatch(actionstorer.addingredients(type));
    },
    removeingredients: (type) => {
      dispatch(actionstorer.removeingredients(type));
    },
    purchasableyy: () => {
      dispatch(actionstorer.purchasable());
    },
  };
};

class BurgerMenu extends Component {
  state = {
    modalopen: false,
  };

  ingredientsadded = (item) => {
    this.props.addingredients(item);
    this.props.purchasableyy();
  };
  ingredientsremoved = (item) => {
    this.props.removeingredients(item);
    this.props.purchasableyy();
  };
  togglefun = () => {
    this.setState({
      modalopen: !this.state.modalopen,
    });
  };
  handlecheckout = () => {
    this.props.history.push("/checkout");
  };
  render() {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center flex-column d-md-flex flex-md-row">
          <Burger ingredients={this.props.ingredients} />
          <Controller
            price={this.props.totalPrice}
            addfunction={this.ingredientsadded}
            removefunction={this.ingredientsremoved}
            modalopen={this.togglefun}
            purchasable={this.props.purchasable}
          />
        </div>
        <Modal isOpen={this.state.modalopen} toggle={this.togglefun}>
          <ModalHeader>This Is Your Order Summary</ModalHeader>
          <ModalBody>
            <Summary ingredients={this.props.ingredients} />
            Total price: {this.props.totalPrice} BDT
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ backgroundColor: "#D70F64" }}
              onClick={this.handlecheckout}
            >
              Proceed To CheckOut
            </Button>{" "}
            <Button color="secondary" onClick={this.togglefun}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default connect(mapstateToProps, mapDispatchToProps)(BurgerMenu);
