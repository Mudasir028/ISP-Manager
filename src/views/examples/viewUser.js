import React from "react";

import { Link } from "react-router-dom";

import form from "../../components/common/form";
// reactstrap components
import {
  FormGroup,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import userPic from "assets/img/theme/team-4-800x800.jpg";

import Toast from "light-toast";
import isp from "../../services/ispService";

class ViewUser extends form {
  state = {
    userDetails: {},
  };

  async componentDidMount() {
    try {
      Toast.loading("Loading...");
      const id = this.props.match.params.user_id;
      const user = await isp.getUserDetails(id);

      const userDetails = user.user[0];

      this.setState({
        userDetails,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
    Toast.hide();
  }

  render() {
    const {
      name,
      cnic,
      status,
      created_at,
      franchise,
      package: package1,
      pic,
      gender,
      address,
      cell_num,
    } = this.state.userDetails;

    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={pic || userPic}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">View User</h3>
                    </Col>

                    <Col className="text-right" xs="4">
                      <Link
                        className="primary h5 mb-0 text-uppercase d-md"
                        // to={`/admin/update-user/${u.id}  `}
                        to={`/isp/update-user/${this.props.match.params.user_id}  `}
                      >
                        Edit
                      </Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor={name}>
                            Name
                          </label>
                          <p>{name}</p>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor={name}>
                            Cnic
                          </label>
                          <p>{cnic}</p>
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor={name}>
                            Joining Date
                          </label>
                          <p>{created_at}</p>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor={name}>
                            Franchise
                          </label>
                          <p>{franchise}</p>
                        </FormGroup>
                      </Col>

                      
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor={name}>
                            Package
                          </label>
                          <p>{package1}</p>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                        <Link
                        className="primary h5 mb-0 text-uppercase d-md"
                        // to={`/admin/update-user/${u.id}  `}
                        to={`/isp/update-subscribed-package/${this.props.match.params.user_id}  `}
                      >
                        Update subscribed package
                      </Link>
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor={name}>
                            Status
                          </label>
                          <p>{status === "1" ? "Active" : "Unactive"}</p>
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor={name}>
                            Gender
                          </label>
                          <p>{gender}</p>
                        </FormGroup>
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
                      <Col md="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor={name}>
                            Address
                          </label>
                          <p>{address}</p>
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor={name}>
                            Number
                          </label>
                          <p>{cell_num}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default ViewUser;
