import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../images/logo_final.png";

const NavBar = () => {
  const { loggedIn, logOutUser, user } = useContext(AuthContext);

  return (
    <div>
      <Navbar className="customNavbar" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/aboutUs">About us</NavLink>
              {loggedIn && <NavLink to="/addProduct">Donate</NavLink>}
              <NavLink to="/categories">Categories</NavLink>
            </Nav>
            <Nav>
              {loggedIn ? (
                <>
                  {/* <a style={{ marginTop: 7 }}>Welcome, {user.name}</a> */}
                  <button onClick={logOutUser} className="btn btn-outline-dakr">
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/signup">Signup</NavLink>
                  <NavLink to="/login">Login</NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
