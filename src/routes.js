import Index from "views/Index.js";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";
import Users from "views/examples/users";
import Packages from "views/examples/packages";
import Franchise from "views/examples/franchise";
import CreateUser from "views/examples/createUser";
import CreatePackage from "views/examples/createPackage";
import CreateFranchise from "views/examples/createFranchise";
import UserBills from "views/examples/userBills";
import Subscriptions from "views/examples/subscriptions";
import PaidBills from "views/examples/paidBills";
import SubscribePackage from "views/examples/subscribePackage";

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
    icon: "ni ni-planet text-red",
    component: Packages,
    layout: "/admin",
  },
  {
    path: "/franchise",
    name: "Franchise",
    icon: "ni ni-app",
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
    path: "/subscribe-package",
    name: "Subscribe Package",
    icon: "ni ni-delivery-fast text-purple",
    component: SubscribePackage,
    layout: "/admin",
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    icon: "ni ni-spaceship text-vilet",
    component: Subscriptions,
    layout: "/admin",
  },
  {
    path: "/user-bills",
    name: "Unpaid Bills ",
    icon: "ni ni-money-coins text-red",
    component: UserBills,
    layout: "/admin",
  },
  {
    path: "/paid-bills",
    name: "Paid Bills ",
    icon: "ni ni-money-coins text-green",
    component: PaidBills,
    layout: "/admin",
  },

  {
    path: "/login",
    // name: "Login",
    // icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },
];
export default routes;
