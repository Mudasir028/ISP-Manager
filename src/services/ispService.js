import http from "./httpService";
import config from "../config.json";

function setFormData(data) {
  const formData = new FormData();
  for (let [key, value] of Object.entries(data)) formData.append(key, value);
  return formData;
}

async function createFranchise(name, area, details) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("area", area);
  formData.append("details", details);

  const { data } = await http.post("/create_franchise", formData);
  return data;
}

async function getAllFranchises() {
  // const { data } = await http.get(`${config.apiEndpoint}/franchises`);
  const { data } = await http.get("/franchises");
  return data;
}

async function getFranchiseDetails(id) {
  const { data } = await http.get(`/franchise/${id}`);
  return data;
}

async function updateFranchise(name, area, details, id) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("area", area);
  formData.append("details", details);
  formData.append("id", id);

  const { data } = await http.post("/update_franchise", formData);
  return data;
}

async function createUser({ ...params }) {
  const formData = setFormData(params);
  const { data } = await http.post(
    // `${config.apiEndpoint}/create_user`,
    "create_user",
    formData
  );
  return data;
}

async function getAllUsers() {
  const { data } = await http.get("/all_users");
  return data;
}

async function getUserDetails(id) {
  const { data } = await http.get(`/user/${id}`);
  return data;
}

async function updateUser({ ...params }) {
  const formData = setFormData(params);
  const { data } = await http.post("/update_user", formData);
  return data;
}
async function createSubscription({ ...params }) {
  const formData = setFormData(params);
  const { data } = await http.post("/create_subscription", formData);
  return data;
}

async function createPackage({ ...params }) {
  console.log(params);
  const formData = setFormData(params);
  const { data } = await http.post("/create_package", formData);
  return data;
}

async function getAllPackages() {
  // const { data } = await http.get(`${config.apiEndpoint}/packages`);
  const { data } = await http.get("/packages");
  return data;
}

async function updatePackage({ ...params }) {
  const formData = setFormData(params);
  const { data } = await http.post("/update_package", formData);
  return data;
}
async function getPackageDetails(id) {
  const { data } = await http.get(`/package/${id}`);
  return data;
}
// async function updatePackagePic({ ...params }) {
//   const formData = setFormData(params);
//   const { data } = await http.post(
//     `${config.apiEndpoint}/update_package_pic`,
//     formData
//   );
//   return data;
// }
async function updatePackagePic(pic, id) {
  const formData = new FormData();
  formData.append("pic", pic);
  formData.append("id", id);

  const { data } = await http.post("/update_package_pic", formData);
  return data;
}

async function getSingleUserBills(user_id) {
  const formData = new FormData();
  formData.append("user_id", user_id);
  const { data } = await http.post("/user_bills", formData);
  return data;
}

async function getSubscriptions() {
  const { data } = await http.get("/subscriptions");
  return data;
}

async function getAllUserbills() {
  const { data } = await http.get("/get_bills");
  return data;
}

async function payUserbill(user_id) {
  const formData = new FormData();
  formData.append("user_id", user_id);
  const { data } = await http.post("/pay_bill", formData);
  return data;
}

async function getPaidBills() {
  const { data } = await http.post("/paid_bills");
  return data;
}

export default {
  createFranchise,
  getAllFranchises,
  getFranchiseDetails,
  updateFranchise,
  createUser,
  getAllUsers,
  getUserDetails,
  updateUser,
  createSubscription,
  createPackage,
  getAllPackages,
  getPackageDetails,
  updatePackage,
  updatePackagePic,
  getSingleUserBills,
  getSubscriptions,
  getAllUserbills,
  payUserbill,
  getPaidBills,
};
