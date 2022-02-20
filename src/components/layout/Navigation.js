import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import logo from "../../images/Holidaze logo.svg";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

export default function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  function signout() {
    setAuth(null);
    navigate("/");
  }

  return (
    <Navbar expand="lg">
      <Container>
        <NavLink className="nav-brand-link" to="/" exact="true">
          <Navbar.Brand>
            <img src={logo} alt="Holidaze logo" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {auth ? (
              <>
                <NavLink to="/" exact="true" className="nav-link">Home</NavLink>
                <NavLink to="/accommodations" className="nav-link">Accommodations</NavLink>
                <NavLink to="/contact" className="nav-link">Contact</NavLink>
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <NavLink to="/admin/messages" className="dropdown-item">Messages</NavLink>
                  <NavLink to="/admin/enquires" className="dropdown-item">Enquires</NavLink>
                  <NavLink to="/admin/add" className="dropdown-item">Add New</NavLink>
                </NavDropdown>
                <Button className="mx-auto" onClick={signout}>Sign out</Button>
              </>
            ) : (
              <>
                <NavLink to="/" exact="true" className="nav-link">Home</NavLink>
                <NavLink to="/accommodations" className="nav-link">Accommodations</NavLink>
                <NavLink to="/contact" className="nav-link">Contact</NavLink>
                <NavLink to="/signin" className="nav-link navbar-nav__signin btn mx-auto">Sign in</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
