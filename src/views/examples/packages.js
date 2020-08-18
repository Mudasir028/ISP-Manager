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
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import TableComponent from "components/common/table";
import Header from "components/Headers/Header.js";

import isp from "../../services/ispService";
import userPic from "assets/img/theme/team-4-800x800.jpg";
import Toast from "light-toast";

class Packages extends React.Component {
  state = { allPackages: [] };

  columns = [
    { path: "name", label: "Name" },
    {
      path: "type",
      label: "Type",
    },
    {
      path: "duration",
      label: "Duration",
    },
    { path: "charges", label: "Charges" },
    { path: "franchise_id", label: "Franchise" },
    { path: "data_limit", label: "Data Limit" },
    {
      path: "status",
      label: "Status",
      content: (p) => (p.status === "1" ? "Active" : "Unactive"),
    },
    { path: "description", label: "Description" },
    {
      path: "pic",
      label: "Pic (optional)",
      content: (p) => (
        <div className="avatar-group">
          <a
            className="avatar avatar-sm"
            href="#pablo"
            id="tooltip742438047"
            onClick={(e) => e.preventDefault()}
          >
            <img alt="..." className="rounded-circle" src={p.pic || userPic} />
          </a>
        </div>
      ),
    },
    { path: "created_at", label: "Created At" },
    { path: "updated_at", label: "Updated At" },
    {
      path: "View",
      label: "View Detail",
      content: (p) => (
        <Link
          className="primary h5 mb-0 text-uppercase d-md"
          to={`/isp/view-package/${p.id}`}
        >
          Veiw
        </Link>
      ),
    },
  ];

  async componentDidMount() {
    try {
      Toast.loading("Loading...");
      const allPackages = await isp.getAllPackages();
      this.setState({ allPackages: allPackages.packages });
      if (allPackages.msg[0].code === "400") {
        window.location = process.env.REACT_APP_BASENAME + "/isp/logout";
      }
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
                <TableComponent
                  columns={this.columns}
                  data={allPackages}
                  classes="table align-items-center table-flush"
                  sortColumn=""
                />

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
