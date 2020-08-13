import React from "react";

import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
} from "reactstrap";
// core components
import TableComponent from "components/common/table";
import Header from "components/Headers/Header.js";
import isp from "../../services/ispService";
import userPic from "assets/img/theme/team-4-800x800.jpg";
import Toast from "light-toast";

class Tables extends React.Component {
  state = { allUsers: [] };

  columns = [
    { path: "name", label: "Name" },
    {
      path: "cnic",
      label: "CNIC",
    },
    {
      path: "cell_num",
      label: "Number",
    },
    { path: "address", label: "Address" },
    { path: "franchise_id", label: "Franchise" },
    { path: "gender", label: "Gender" },
    { path: "created_at", label: "Created At" },
    {
      path: "status",
      label: "Status",
      content: (u) => (u.status === "1" ? "Active" : "Unactive"),
    },
    { path: "package_id", label: "Package" },
    { path: "updated_at", label: "Updated At" },
    {
      path: "Bills",
      label: "Bills",
      content: (u) => (
        <Link
          className="primary h5 mb-0 text-uppercase d-md"
          to={`/isp/single-user-bills/${u.id}  `}
        >
          User Bills
        </Link>
      ),
    },
    {
      path: "View",
      label: "View Detail",
      content: (u) => (
        <Link
          className="primary h5 mb-0 text-uppercase d-md"
          to={`/isp/view-user/${u.id}  `}
        >
          Veiw
        </Link>
      ),
    },
  ];

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
                <TableComponent
                  columns={this.columns}
                  data={allUsers}
                  classes="table align-items-center table-flush"
                  sortColumn=""
                />

                {/* <td>
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
                        </td> */}

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
