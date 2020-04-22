import http from "./httpService";

import config from "../config.json";

function setFormData(data) {
  const formData = new FormData();
  for (let [key, value] of Object.entries(data)) formData.append(key, value);
  return formData;
}

// async function updateBalance(balanceId, balance) {
//   const formData = new FormData();
//   formData.append("balance", balance);
//   const { data } = await http.post("/update-balance/" + balanceId, formData);
//   return data;
// }

async function createFranchise(name, area, details) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("area", area);
  formData.append("details", details);

  const { data } = await http.post(
    `${config.apiEndpoint}/create_franchise`,
    formData
  );
  return data;
}
async function getAllUsers() {
  const { data } = await http.get(`${config.apiEndpoint}/all_users`);
  return data;
}

// async function handleCurrencyPair({ url, ...params }) {
//   const formData = setFormData(params);
//   const { data } = await http.post(url, formData);
//   return data;
// }

export default {
  createFranchise,
  getAllUsers,
};
