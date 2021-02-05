import React, { Component } from "react";
import { Formik } from "formik";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { connect } from "react-redux";
import * as authactions from "../../../Redux/authactions";
import Spinner from "../Spinner/Spinner";
const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, mode) =>
      dispatch(authactions.auth(email, password, mode)),
  };
};
const mapStateToProps = (state) => {
  return {
    authloading: state.authloading,
    authloadingfailedmessage: state.authloadingfailedmessage,
  };
};
class Authentication extends Component {
  state = {
    mode: " SIGNUP",
  };
  switchstate = () => {
    this.setState({
      mode: this.state.mode === " SIGNUP" ? " LOGIN" : " SIGNUP",
    });
  };
  render() {
    let arr = null,err=null;
    if(this.props.authloadingfailedmessage!==null){
      err= <Alert color="danger">{this.props.authloadingfailedmessage} </Alert>

    }
    if (this.props.authloading) {
      arr = <Spinner />;
    } else {
      arr = (
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmpassword: "",
          }}
          onSubmit={(values) => {
            this.props.auth(values.email, values.password, this.state.mode);
          }}
          validate={(values) => {
            const error = {};
            if (!values.email) {
              error.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              error.email = "Please Input a valid Email";
            }
            if (!values.password) {
              error.password = "Required";
            } else if (values.password.length < 6) {
              error.password = "Input a Password more than 6 Characters";
            }
            if (this.state.mode === " SIGNUP") {
              if (!values.confirmpassword) {
                error.confirmpassword = "Required";
              } else if (values.confirmpassword !== values.password) {
                error.confirmpassword = "Passwords Do Not Matches";
              }
            }

            return error;
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <div className="container p-3 my-4 w-50">
              <button
                style={{
                  backgroundColor: "#D70F64",
                  width: "100%",
                  color: "white",
                }}
                className="btn btn-lg my-4"
                onClick={this.switchstate}
              >
                Switch To
                {this.state.mode === " SIGNUP" ? " LOGIN" : " SIGNUP"}
              </button>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Input Your Email Here"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <span style={{ color: "red", fontSize: "20px" }}>
                    {errors.email}
                  </span>
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    value={values.password}
                    placeholder="Input Your PassWord Here"
                    onChange={handleChange}
                  />
                  <span style={{ color: "red", fontSize: "20px" }}>
                    {errors.password}
                  </span>
                </FormGroup>
                {this.state.mode === " SIGNUP" ? (
                  <div>
                    <FormGroup>
                      <Label for="exampleconfirmPassword">
                        Confirm Password
                      </Label>
                      <Input
                        type="password"
                        name="confirmpassword"
                        id="exampleconfirmPassword"
                        value={values.confirmpassword}
                        placeholder="Confirm Your Password"
                        onChange={handleChange}
                      />
                      <span style={{ color: "red", fontSize: "20px" }}>
                        {errors.confirmpassword}
                      </span>
                    </FormGroup>
                  </div>
                ) : null}
                <Button type="submit">{this.state.mode}</Button>
              </Form>
            </div>
          )}
        </Formik>
      );
    }
    return (
      <>
        {err}
        <div className="container">
          <h1 className="text-center my-5"> {this.state.mode}</h1>
          {arr}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
