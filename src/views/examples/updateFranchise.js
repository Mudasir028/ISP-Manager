import React from "react";

import Joi from "joi-browser";

import form from "../../components/common/form";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import { toast } from "react-toastify";
import isp from "../../services/ispService";

class UpdateFranchise extends form {
  state = {
    data: {
      name: "",
      date: "",
      area: "",
      details: "",
    },
    errors: {},
    isSpinner: false,
  };

  schema = {
    name: Joi.string().required().label("Name"),
    date: Joi.date().required().label("Joining Date"),
    area: Joi.string().required().label("Area"),
    details: Joi.string().required().label("Details"),
  };

  doSubmit = async () => {
    console.log("form validated");

    try {
      this.setState({ isSpinner: true });
      const id = this.props.match.params.franchise_id;
      const { data } = this.state;
      await isp.updateFranchise(data.name, data.area, data.details, id);
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;
        this.setState({ errors });

        toast.error(ex.response.data);
      }
    }
    this.setState({
      isSpinner: false,
    });
  };

  render() {
    // console.log("this.props.match.params");
    // console.log(this.props.match.params.franchise_id);
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Update Franchise</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          {this.renderInput(
                            "name",
                            "Name",
                            "text",
                            "Franchise Name"
                          )}
                        </Col>

                        <Col lg="6">
                          {this.renderInput(
                            "date",
                            "Creation Date",
                            "date",
                            "date placeholder"
                          )}
                        </Col>

                        <Col md="12">
                          {this.renderInput(
                            "area",
                            "Area",
                            "text",
                            "Franchise Area"
                          )}
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Details */}
                    <h6 className="heading-small text-muted mb-4">
                      About Area
                    </h6>
                    <div className="pl-lg-4">
                      {this.renderInput(
                        "details",
                        "Details",
                        "textarea",
                        "A few words about Package ..."
                      )}
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
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default UpdateFranchise;
