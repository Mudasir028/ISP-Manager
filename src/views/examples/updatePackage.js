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
import { types } from "../../services/fakeData";
import userPic from "assets/img/theme/team-4-800x800.jpg";

import { toast } from "react-toastify";
import isp from "../../services/ispService";

class UpdatePackage extends form {
  state = {
    data: {
      name: "",
      type: "Monthly",
      duration: 30,
      charges: "",
      franchise: "",
      data: "",
      picUrl: "",
      status: false,
      date: "",
      description: "",
    },
    errors: {},
    allFranchises: [],
  };

  schema = {
    name: Joi.string().required().label("Name"),
    type: Joi.string().required().label("Type"),
    duration: Joi.number().required().label("Duration"),
    charges: Joi.number().required().label("Charges"),
    franchise: Joi.string().required().label("Franchise"),
    data: Joi.string().required().label("Data Limit"),
    picUrl: Joi.any()
      .meta({ swaggerType: "file" })
      .optional()
      .allow("")
      .description("image file"),
    date: Joi.date().required().label("Joining Date"),
    status: Joi.boolean().required().label("Status"),
    description: Joi.string().required().label("Description"),
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.package_id;
      const getPackage = isp.getPackageDetails(id);

      const Franchises = isp.getAllFranchises();
      const [package1, allFranchises] = await Promise.all([
        getPackage,
        Franchises,
      ]);

      console.log(package1);

      // const packageDetails = package1.package[0];

      const { data } = this.state;
      // data.name = packageDetails.name;
      // data.cnic = packageDetails.cnic;
      // data.number = packageDetails.cell_num;
      // // data.franchise = packageDetails.franchise;
      // data.address = packageDetails.address;
      // data.gender = packageDetails.gender;
      // data.date = packageDetails.created_at;
      // data.status = packageDetails.status;

      // data.picUrl = packageDetails.pic;

      this.setState({
        data,
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
      const id = this.props.match.params.package_id;
      const {
        name,
        type,
        duration,
        charges,
        franchise: franchise_id,
        data: data_limit,
        description,
      } = this.state.data;

      await isp.updatePackage({
        name,
        type,
        duration,
        charges,
        franchise_id,
        data_limit,
        description,
        id,
      });
      const picUrl = document.querySelector("#picUrl");
      await isp.updatePackagePic(picUrl.files[0], id);
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

  handleDuration = () => {
    const data = { ...this.state.data };

    if (data.type === "Monthly") {
      data.duration = 30;
    }
    if (data.type === "Weekly") {
      data.duration = 7;
    }
    if (data.type === "Daily") {
      data.duration = 1;
    }

    this.setState({ data });
  };

  render() {
    const {
      name,
      // type,
      duration,
      charges,
      status,
      date,
      franchise,
      picUrl,
      data,
      description,
    } = this.state.data;
    const { allFranchises } = this.state;

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
                      {`Duration: ${duration}`}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {`Date: ${date}`}
                    </div>
                    <p>{`Franchise: ${franchise}`}</p>
                    <hr className="my-4" />
                    <p>Status: {status === "true" ? "Active" : "Inactive"}</p>
                    <hr className="my-4" />
                    <p> {`Data: ${data}`}</p>
                    <p> {`Charges: ${charges}`}</p>
                    <p> {`Description : ${description}`}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Create Package</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      Package information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          {this.renderInput(
                            "name",
                            "Name",
                            "text",
                            "Package 1"
                          )}
                        </Col>

                        <Col lg="6">
                          {this.renderSelect(
                            "type",
                            "Type",
                            types,
                            this.handleDuration
                          )}
                        </Col>

                        <Col lg="6">
                          {this.renderInput(
                            "duration",
                            "Duration",
                            "text",
                            "30",
                            true
                          )}
                        </Col>

                        <Col lg="6">
                          {this.renderInput("data", "Data", "text", "4Mb")}
                        </Col>

                        <Col lg="6">
                          {this.renderInput(
                            "charges",
                            "Charges",
                            "text",
                            "2000"
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
                          {this.renderInput(
                            "date",
                            "Joining Date",
                            "date",
                            "date placeholder"
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
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Details */}
                    <h6 className="heading-small text-muted mb-4">
                      Description Area
                    </h6>
                    <div className="pl-lg-4">
                      {this.renderInput(
                        "description",
                        "Description",
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

export default UpdatePackage;
