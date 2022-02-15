import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  function signout() {
    setAuth(null);
    navigate("/");
  }

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <NavLink className="nav-brand-link" to="/" exact="true">
          <Navbar.Brand>Holidaze</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
                <button className="btn btn-primary" onClick={signout}>Sign out</button>
              </>
            ) : (
              <>
                <NavLink to="/" exact="true" className="nav-link">Home</NavLink>
                <NavLink to="/accommodations" className="nav-link">Accommodations</NavLink>
                <NavLink to="/contact" className="nav-link">Contact</NavLink>
                <NavLink to="/signin" className="nav-link">Sign in</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
