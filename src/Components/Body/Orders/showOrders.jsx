import { Card, CardTitle, CardText, CardSubtitle, CardBody } from "reactstrap";
import React from "react";

const showOrders = (props) => {
  const style = {
    backgroundColor: "gray",
    fontSize: "18px",
  };
  let ordersummary = props.orders.order,
    showsummary = null;
  showsummary = ordersummary.map((item) => {
    return (
      <span key={Math.random()} style={style}>
        {item.type} X {item.amount} ,{" "}
      </span>
    );
  });
  return (
    <Card className="col-md-5 mx-2 col-sm-2">
      <CardBody>
        <CardTitle>
          <h4>Name : {props.orders.customer.oname} </h4>{" "}
        </CardTitle>
        <CardSubtitle>
          Delivery Address: {props.orders.customer.oaddress}
        </CardSubtitle>
        <CardText className="my-3">{showsummary}</CardText>
        <p> Total Order Price:&nbsp;&nbsp;&nbsp;{props.orders.price} BDT </p>
      </CardBody>
    </Card>
  );
};
export default showOrders;
