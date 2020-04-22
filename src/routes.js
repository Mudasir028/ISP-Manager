/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";
import Users from "views/examples/users";
import Packages from "views/examples/packages";
import Franchise from "views/examples/franchise";
import CreateUser from "views/examples/createUser";
import CreatePackage from "views/examples/createPackage";
import CreateFranchise from "views/examples/createFranchise";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  // },
  {
    path: "/users",
    name: "Users",
    icon: "ni  ni-single-02 text-yellow",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/packages",
    name: "Packages",
    icon: "ni ni-bullet-list-67 text-red",
    component: Packages,
    layout: "/admin",
  },
  {
    path: "/franchise",
    name: "Franchise",
    icon: "ni ni-bullet-list-67 text-red",
    component: Franchise,
    layout: "/admin",
  },
  {
    path: "/create-user",
    name: "Create User",
    icon: "ni ni-user-run text-pink",
    component: CreateUser,
    layout: "/admin",
  },
  {
    path: "/create-package",
    name: "Create Package ",
    icon: " ni ni-diamond text-blue",
    component: CreatePackage,
    layout: "/admin",
  },
  {
    path: "/create-Franchise",
    name: "Create Franchise ",
    icon: " ni ni-shop text-yellow",
    component: CreateFranchise,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
