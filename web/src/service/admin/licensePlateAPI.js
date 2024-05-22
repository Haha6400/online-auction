import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export async function createLicensePlate(idToken, data) {
  const response = await axios({
    method: "post",
    url: API_BASE_URL + "/license-plates",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    data: data,
  });

  return response.data;
}

export async function getAllLicensePlate(idToken) {
  const response = await axios({
    method: "get",
    url: API_BASE_URL + "/license-plates",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return response.data;
}

export async function updateLicensePlate(idToken, id, data) {
  const response = await axios({
    method: "patch",
    url: API_BASE_URL + "/license-plates/" + id,
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    data: data,
  });

  return response.data;
}

export async function deleteLicensePlate(idToken, id) {
  const response = await axios({
    method: "delete",
    url: API_BASE_URL + "/license-plates/" + id,
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return response.data;
}
