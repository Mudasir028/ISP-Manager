import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import auth from "./services/authService";

const user = auth.getCurrentUser();

const hist = createBrowserHistory({ basename: process.env.REACT_APP_BASENAME });

ReactDOM.render(
  <BrowserRouter history={hist}>
    <Switch>
      {user ? (
        <Route path="/isp" render={(props) => <AdminLayout {...props} />} />
      ) : (
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      )}
      {user ? (
        <>
          <Redirect to="/" />
          <Redirect from="/" to="/isp/users" />
        </>
      ) : (
        <>
          <Redirect from="/" to="/auth/login" />
        </>
      )}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
