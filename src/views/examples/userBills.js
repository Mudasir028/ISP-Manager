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
import Header from "components/Headers/Header.js";
import isp from "../../services/ispService";
import Toast from "light-toast";

class UserBills extends React.Component {
  state = { allUserBills: [] };

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
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">CNIC</th>
                      <th scope="col">Number</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Pay Date</th>
                      <th scope="col">Last Paid</th>
                      <th scope="col">Action</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {allUserBills.map((u) => (
                      <tr key={u.user_id}>
                        <td>{u.name}</td>
                        <td>{u.nic}</td>
                        <td>{u.cell_num}</td>
                        <td>{u.amount}</td>
                        <td>{u.pay_date}</td>
                        <td>{u.last_paid}</td>
                        <td>
                          <Button
                            className="navbar-toggler"
                            type="button"
                            onClick={() => this.handleBills(u.user_id)}
                          >
                            Pay Bill
                          </Button>
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

export default UserBills;
