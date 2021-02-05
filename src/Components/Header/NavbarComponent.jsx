import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Logo from "../../assets/logo.png";
import { connect } from "react-redux";
const mapstateToProps = (state) => {
  return {
    token: state.token,
  };
};
const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  let links = null;
  if (props.token !== null) {
    links = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink
            to="/burgerbuilder"
            className="NavLink"
            exact
            activeClassName="activeclass"
          >
            BurgerBuilder
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/orders" className="NavLink" exact>
            Orders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/logout" className="NavLink" exact>
            LOGOUT
          </NavLink>
        </NavItem>
      </Nav>
    );
  } else
    links = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink to="/signup" className="NavLink" exact>
            SIGNUP
          </NavLink>
        </NavItem>
      </Nav>
    );
  return (
    <div>
      <Navbar className="sticky-top Navbar" dark expand="md">
        <div className="container">
          <NavbarBrand href="/">
            <img src={Logo} alt="Logo" width="80px" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
          {links}
            {/* <NavItem>
        <NavLink to="/contactus"
         className="NavLink"
         >
          Contact Us
        </NavLink>
      </NavItem> */}
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default connect(mapstateToProps)(NavbarComponent);
