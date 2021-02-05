import React from "react";
import { Card, CardBody, Button, CardHeader, CardFooter } from "reactstrap";
const controll = [
  { label: "Cheese", type: "Cheese" },
  { label: "Meat", type: "Meat" },
  { label: "Salad", type: "Salad" },
];
const Buildcontroller = (props) => {
  return (
    <div className="container d-flex justify-content-between mb-3">
    <div style={{
        fontSize:"20px",
        fontWeight:"bold"
    }}>
      {props.label}
    </div>
      <div>
        <button className="btn btn-success btn-sm" onClick={props.addingredients}>Add More</button>
        <button className="btn btn-danger btn-sm" onClick={props.removeingredients}>Less More</button>
      </div>
    </div>
  );
};

const Controller = (props) => {
    return (
    <div className="mx-auto mr-md-3 w-75 my-5">
      <Card>
        <CardHeader style={{ backgroundColor: "#D70F64", color: "white" }}>
          <h4>Add Ingredients to The BURGERRRRR...... </h4>
        </CardHeader>
        <CardBody>
          {controll.map((item) => {
            return <Buildcontroller label={item.label} key={Math.random()} addingredients={()=>props.addfunction(item.type)} removeingredients={()=>props.removefunction(item.type)}/>;
          })}
        </CardBody>
        <CardFooter> Price: {props.price} BDT</CardFooter>
        <Button style={{backgroundColor:"#D70F64"}} onClick={props.modalopen} disabled={!props.purchasable}>CheckOut Now!!!</Button>
      </Card>
    </div>
  );
};

export default Controller;
