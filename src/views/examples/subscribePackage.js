import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Row,
  Button,
  Col,
  Form,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import isp from "../../services/ispService";
import form from "../../components/common/form";
import Joi from "joi-browser";
import Toast from "light-toast";

class SubscribePackage extends form {
  state = {
    data: { user: "", package1: "" },
    allUsers: [],
    allPackages: [],
    errors: {},
  };

  schema = {
    user: Joi.string().required().label("User"),
    package1: Joi.string().required().label("Package"),
  };

  async componentDidMount() {
    try {
      const getuser = isp.getAllUsers();
      const Packages = isp.getAllPackages();
      const [allUsers, allPackages] = await Promise.all([getuser, Packages]);
      const data = { ...this.state.data };
      data.user = allUsers.users[0].id.toString();
      data.package1 = allPackages.packages[0].id.toString();
      this.setState({
        data,
        allUsers: allUsers.users,
        allPackages: allPackages.packages,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
  }

  doSubmit = async () => {
    try {
      Toast.loading("Loading...");
      this.setState({ isSpinner: true });
      const { user, package1 } = this.state.data;

      const res = await isp.createSubscription({
        user_id: user,
        package_id: package1,
      });
      Toast.hide();
      Toast.success(res.msg[0].message, 3000);
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;
        this.setState({ errors });

        Toast.fail(ex.response.data, 3000);
      }
    }
    this.setState({
      isSpinner: false,
    });
  };

  render() {
    const { allUsers, allPackages } = this.state;

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
                  <h3 className="mb-0">Subscribe Package</h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      package Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          {this.renderSelect("user", "Users", allUsers)}
                        </Col>

                        <Col lg="6">
                          {this.renderSelect(
                            "package1",
                            "Package",
                            allPackages
                          )}
                        </Col>
                      </Row>
                    </div>
                    <Row>
                      <Col className="text-right" xs="12">
                        <Button color="primary" size="lg" type="submit">
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>

                <CardFooter className="py-4"></CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default SubscribePackage;
