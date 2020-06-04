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

import userPic from "assets/img/theme/team-4-800x800.jpg";

import { toast } from "react-toastify";
import isp from "../../services/ispService";

class UpdateUser extends form {
  state = {
    data: {
      name: "",
      cnic: "",
      number: "",
      address: "",
      franchise: "",
      gender: "",
      date: new Date(),
      status: false,
      package1: "",
      picUrl: "",
    },
    errors: {},
    allPackages: [],
    allFranchises: [],
  };

  schema = {
    name: Joi.string().required().label("Name"),
    cnic: Joi.string().required().label("CNIC"),
    number: Joi.number().required().label("Number"),
    address: Joi.string().required().label("Address"),
    franchise: Joi.string().required().label("Franchise"),
    gender: Joi.string().required().label("Gender"),
    date: Joi.date().allow("").label("Joining Date"),
    status: Joi.boolean().required().label("Status"),
    package1: Joi.string().required().label("Package"),
    picUrl: Joi.string().allow("").label("PicUrl"),
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.user_id;
      const getuser = isp.getUserDetails(id);
      const Packages = isp.getAllPackages();
      const Franchises = isp.getAllFranchises();
      const [user, allPackages, allFranchises] = await Promise.all([
        getuser,
        Packages,
        Franchises,
      ]);
      const userDetails = user.user[0];
      const { data } = this.state;
      data.name = userDetails.name;
      data.cnic = userDetails.cnic;
      data.number = userDetails.cell_num;
      // data.franchise = userDetails.franchise;
      data.address = userDetails.address;
      data.gender = userDetails.gender;
      data.date = userDetails.created_at;
      data.status = Boolean(JSON.parse(userDetails.status.toLowerCase()));
      // data.status = Boolean.parse();
      // data.package1 = userDetails.package;

      // data.picUrl = userDetails.pic;

      this.setState({
        data,
        allPackages: allPackages.packages,
        allFranchises: allFranchises.franchises,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
  }

  doSubmit = async () => {
    console.log("form validated");

    try {
      this.setState({ isSpinner: true });
      const id = this.props.match.params.user_id;
      const {
        name,
        cnic,
        number: cell_num,
        address,
        franchise: franchise_id,
        gender,
        date,
        package1,
      } = this.state.data;

      await isp.updateUser({
        name,
        cnic,
        cell_num,
        address,
        franchise_id,
        gender,
        created_at: date,
        id,
      });
      await isp.createSubscription({
        user_id: id,
        package_id: package1,
      });
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
    const {
      name,
      cnic,
      status,
      date,
      franchise,
      package1,
      picUrl,
      gender,
      address,
      number,
    } = this.state.data;
    const { allFranchises, allPackages } = this.state;

    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            {/* <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={picUrl ? picUrl : userPic}
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
                    <p>Status: {status === 1 ? "Active" : "Inactive"}</p>
                    <p> {`Package: ${package1}`}</p>
                    <p> {`Gender: ${gender}`}</p>
                    <hr className="my-4" />
                    <p> {`Address: ${address}`}</p>
                    <p> {`Number: ${number}`}</p>
                  </div>
                </CardBody>
              </Card>
            </Col> */}
            {/* <Col className="order-xl-1" xl="8"> */}
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Update User</h3>
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
                            allFranchises
                          )}
                        </Col>

                        <Col lg="6">
                          {this.renderSelect("status", "Status", [
                            { id: false, name: "Inactive" },
                            { id: true, name: "Active" },
                          ])}
                        </Col>
                        <Col lg="6">
                          {this.renderSelect(
                            "package1",
                            "Package",
                            allPackages
                          )}
                        </Col>
                        <Col lg="6">
                          {this.renderImageInput(
                            "picUrl",
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

export default UpdateUser;
