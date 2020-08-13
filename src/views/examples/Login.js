import React from "react";
import form from "../../components/common/form";

// reactstrap components
import { Button, Card, CardHeader, CardBody, Form, Row, Col } from "reactstrap";

import Joi from "joi-browser";
import auth from "../../services/authService";
import Toast from "light-toast";

class Login extends form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      Toast.loading("Loading...");
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      // window.location = state ? state.from.pathname : "/";

      window.location = state
        ? state.from.pathname
        : process.env.REACT_APP_BASENAME + "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    Toast.hide();
  };

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>
              <Form onSubmit={this.handleSubmit}>
                {this.renderLoginInput(
                  "username",
                  "text",
                  "Username",
                  "ni ni-email-83"
                )}
                {this.renderLoginInput(
                  "password",
                  "password",
                  "Password",
                  "ni ni-lock-circle-open"
                )}

                {/* <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div> */}
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            {/* <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col> */}
            {/* <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col> */}
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
