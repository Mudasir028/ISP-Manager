import React from "react";
// form validation
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
import { Franchises } from "../../services/fakeData";
import { Packages } from "../../services/fakeData";

class CreateUser extends form {
  state = {
    data: {
      name: "",
      cnic: "",
      date: "",
      franchise: "",
      status: false,
      package1: "",
      picUrl: "",
      gender: "",
      address: "",
      number: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    cnic: Joi.string().required().label("CNIC"),
    date: Joi.date().required().label("Joining Date"),
    franchise: Joi.string().required().label("Franchise"),
    status: Joi.boolean().required().label("Status"),
    package1: Joi.string().required().label("Package"),
    picUrl: Joi.string().label("PicUrl"),
    gender: Joi.string().required().label("Gender"),
    address: Joi.string().required().label("Address"),
    number: Joi.number().required().label("Number"),
  };

  render() {
    const {
      name,
      cnic,
      status,
      date,
      franchise,
      package1,
      // picUrl,
      gender,
      address,
      number,
    } = this.state.data;
    console.log("gender");
    console.log(gender);

    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center mt-5">
                    <h3>{`Name: ${name}`}</h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {`CNIC: ${cnic}`}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {`Date: ${date}`}
                    </div>
                    <p>{`Franchise: ${franchise}`}</p>
                    <hr className="my-4" />
                    <p>Status: {status === "true" ? "Active" : "Inactive"}</p>
                    <p> {`Package: ${package1}`}</p>
                    <p> {`Gender: ${gender}`}</p>
                    <hr className="my-4" />
                    <p> {`Address: ${address}`}</p>
                    <p> {`Number: ${number}`}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          {this.renderInput("name", "Name", "text", "Lucky")}
                        </Col>
                        <Col lg="6">
                          {this.renderInput(
                            "cnic",
                            "CNIC",
                            "text",
                            "34502-0350539-9"
                          )}
                        </Col>

                        <Col lg="6">
                          {this.renderInput(
                            "date",
                            "Joining Date",
                            "date",
                            "date placeholder"
                          )}
                        </Col>
                        <Col lg="6">
                          {this.renderSelect(
                            "franchise",
                            "Franchise",
                            Franchises
                          )}
                        </Col>

                        <Col lg="6">
                          {this.renderSelect("status", "Status", [
                            { id: false, name: "Inactive" },
                            { id: true, name: "Active" },
                          ])}
                        </Col>
                        <Col lg="6">
                          {this.renderSelect("package1", "Package", Packages)}
                        </Col>
                        <Col lg="6">
                          {this.renderImageInput(
                            "pic",
                            "Pic (optional)",
                            "file",
                            "Yo, pick a Image!"
                          )}
                        </Col>
                        <Col lg="6">
                          {this.renderGenderInput("gender", "Gender", "radio", [
                            { id: "0", name: "Male" },
                            { id: "1", name: "Female" },
                          ])}
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          {this.renderInput(
                            "address",
                            "Address",
                            "text",
                            "Home Address"
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          {this.renderInput(
                            "number",
                            "Number",
                            "number",
                            "+923032394255"
                          )}
                        </Col>
                      </Row>
                    </div>
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

export default CreateUser;
