/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import { Link } from "react-router-dom";

// reactstrap components
import {
  // Badge,
  Card,
  CardHeader,
  CardFooter,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  // Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  // Progress,
  Table,
  Container,
  Row,
  // UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import isp from "../../services/ispService";
import userPic from "assets/img/theme/team-4-800x800.jpg";
import Toast from "light-toast";

class Packages extends React.Component {
  state = { allPackages: [] };

  async componentDidMount() {
    try {
      Toast.loading("Loading...");
      const allPackages = await isp.getAllPackages();
      this.setState({ allPackages: allPackages.packages });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
    Toast.hide();
  }

  render() {
    const { allPackages } = this.state;

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">All Packages</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Charges</th>
                      <th scope="col">Franchise</th>
                      <th scope="col">Data Limit</th>
                      <th scope="col">Creation Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Discription</th>
                      <th scope="col">Pic (optional)</th>
                      <th scope="col">View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPackages.map((p) => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.type}</td>
                        <td>{p.duration}</td>
                        <td>{p.charges}</td>
                        <td>{p.franchise_id}</td>
                        <td>{p.data_limit}</td>
                        <td>{p.created_at}</td>
                        <td>{p.status ? "Active" : "Unactive"}</td>
                        <td>{p.description}</td>

                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm"
                              href="#pablo"
                              id="tooltip742438047"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                className="rounded-circle"
                                src={p.pic || userPic}
                              />
                            </a>
                          </div>
                        </td>

                        <td>
                          <Link
                            className="primary h4 mb-0 text-uppercase d-md"
                            to={`/admin/view-package/${p.id}`}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Packages;
