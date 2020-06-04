import React from "react";
import auth from "../../services/authService";

class Logout extends React.Component {
  async componentDidMount() {
    const username = "ispmanager";
    await auth.logout(username);

    window.location = process.env.REACT_APP_BASENAME + "/";
  }

  render() {
    return null;
  }
}

export default Logout;
