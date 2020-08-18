import React from "react";

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
  Button,
} from "reactstrap";
// core components
import TableComponent from "components/common/table";
import Header from "components/Headers/Header.js";
import isp from "../../services/ispService";
import Toast from "light-toast";

class UserBills extends React.Component {
  state = { allUserBills: [] };

  columns = [
    { path: "name", label: "Name" },
    { path: "user_id", label: "User Id" },
    { path: "nic", label: "CNIC" },
    { path: "cell_num", label: "Number" },
    {
      path: "amount",
      label: "Amount",
    },
    { path: "pay_date", label: "Pay Date" },
    { path: "last_paid", label: "Last Paid" },
    {
      path: "updated_at",
      label: "Action",
      content: (u) => (
        <Button
          className="navbar-toggler"
          type="button"
          onClick={() => this.handleBills(u.user_id)}
        >
          Pay Bill
        </Button>
      ),
    },
  ];

  async componentDidMount() {
    try {
      Toast.loading("Loading...");
      const res = await isp.getAllUserbills();
      this.setState({ allUserBills: res.bills });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
    Toast.hide();
  }

  handleBills = async (user_id) => {
    try {
      Toast.loading("Loading...");
      const res = await isp.payUserbill(user_id);
      Toast.hide();
      Toast.success(res.msg[0].message, 3000);
      const originalAllUserBills = this.state.allUserBills;
      const allUserBills = originalAllUserBills.filter(
        (u) => u.user_id !== user_id
      );
      this.setState({ allUserBills });
      if (res.msg[0].code === "400") {
        window.location = process.env.REACT_APP_BASENAME + "/isp/logout";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
  };

  render() {
    const { allUserBills } = this.state;

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
                  <h3 className="mb-0">Unpaid Bills</h3>
                </CardHeader>

                <TableComponent
                  columns={this.columns}
                  data={allUserBills}
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

export default UserBills;
