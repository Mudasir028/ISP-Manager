import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CustomInput,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

class CreatePackage extends React.Component {
  state = {};
  render() {
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
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
                              Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Pakage"
                              id="input-nane"
                              placeholder="Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-date"
                            >
                              Creation Date
                            </label>
                            <Input
                              type="date"
                              name="date"
                              id="input-date"
                              placeholder="date placeholder"
                            />
                          </FormGroup>
                        </Col>

                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-area"
                            >
                              Area
                            </label>
                            <Input type="select">
                              <option>Area 1</option>
                              <option>Area 2</option>
                              <option>Area 3</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Details */}
                    <h6 className="heading-small text-muted mb-4">
                      About Area
                    </h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>Details</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about Package ..."
                          rows="4"
                          defaultValue=""
                          type="textarea"
                        />
                      </FormGroup>
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

export default CreatePackage;
