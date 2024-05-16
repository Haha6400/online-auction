import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export async function getAllAuctionRoom() {
  const response = await axios({
    method: "get",
    url: API_BASE_URL + "/auction-rooms",
  });

  return response.data;
}
