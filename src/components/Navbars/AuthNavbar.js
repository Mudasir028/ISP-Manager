import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { NavbarBrand, Navbar, Container } from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              <img
                alt="..."
                src={require("assets/img/brand/argon-react-white.png")}
              />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            {/* <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("assets/img/brand/argon-react.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      id="navbar-collapse-main"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="nav-link-icon" to="/" tag={Link}>
                    <i className="ni ni-planet" />
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/register"
                    tag={Link}
                  >
                    <i className="ni ni-circle-08" />
                    <span className="nav-link-inner--text">Register</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/login"
                    tag={Link}
                  >
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/admin/user-profile"
                    tag={Link}
                  >
                    <i className="ni ni-single-02" />
                    <span className="nav-link-inner--text">Profile</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/admin/users"
                    tag={Link}
                  >
                    <i className="ni ni-single-02" />
                    <span className="nav-link-inner--text">User</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/admin/packages"
                    tag={Link}
                  >
                    <i className="ni ni-single-02" />
                    <span className="nav-link-inner--text">Packages</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/admin/franchise"
                    tag={Link}
                  >
                    <i className="ni ni-single-02" />
                    <span className="nav-link-inner--text">Franchise</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/admin/create-user"
                    tag={Link}
                  >
                    <i className="ni ni-single-02" />
                    <span className="nav-link-inner--text">Create User</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/admin/create-package"
                    tag={Link}
                  >
                    <i className="ni ni-single-02" />
                    <span className="nav-link-inner--text">Create Package</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/admin/create-Franchise"
                    tag={Link}
                  >
                    <i className="ni ni-single-02" />
                    <span className="nav-link-inner--text">
                      Create Franchise
                    </span>
                  </NavLink>
                </NavItem>
              </Nav>
            </UncontrolledCollapse> */}
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
