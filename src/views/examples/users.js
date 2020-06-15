import React from "react";

import { Link } from "react-router-dom";

// reactstrap components
import {
  // Badge,s
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

class Tables extends React.Component {
  state = { allUsers: [] };

  async componentDidMount() {
    try {
      Toast.loading("Loading...");
      const allUsers = await isp.getAllUsers();
      this.setState({ allUsers: allUsers.users });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
    Toast.hide();
  }

  render() {
    const { allUsers } = this.state;

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
                  <h3 className="mb-0">All Users</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">CNIC</th>
                      <th scope="col">Number</th>
                      <th scope="col">Address</th>
                      <th scope="col">Franchise</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Status</th>
                      <th scope="col">Current package</th>
                      <th scope="col">Pic (optional)</th>
                      <th scope="col">Bills</th>
                      <th scope="col">View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((u) => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.cnic}</td>
                        <td>{u.cell_num}</td>
                        <td>{u.address}</td>
                        <td>{u.franchise_id}</td>
                        <td>{u.gender}</td>
                        <td>{u.created_at}</td>
                        <td>{u.status === "1" ? "Active" : "Unactive"}</td>
                        <td>{u.package_id}</td>

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
                                src={u.pic || userPic}
                              />
                            </a>
                          </div>
                        </td>

                        <td>
                          <Link
                            className="primary h5 mb-0 text-uppercase d-md"
                            to={`/admin/single-user-bills/${u.id}  `}
                          >
                            User Bills
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="primary h5 mb-0 text-uppercase d-md"
                            to={`/admin/view-user/${u.id}  `}
                          >
                            Veiw
                          </Link>
                        </td>
                        {/* <td>
                          <Link
                            className="primary h5 mb-0 text-uppercase d-md"
                            to={`/admin/update-user/${u.id}  `}
                          >
                            Edit
                          </Link>
                        </td> */}
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

export default Tables;
