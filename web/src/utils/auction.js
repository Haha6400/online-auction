import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

let stompClient = null;

let subscriber = null;
let connection;
let connectedPromise = null;
let alreadyConnectedOnce = false;

const createConnection = () =>
  new Promise((resolve) => (connectedPromise = resolve));

// const auctionRoomId = 1500;

export const subscribe = (onSendBid1, onSendBid2, auctionRoomId) => {
  connection.then(() => {
    subscriber = stompClient.subscribe(
      `/user/topic/auctionRoom/${auctionRoomId}`,
      (data) => {
        onSendBid1(data);
      },
    );
  });

  connection.then(() => {
    subscriber = stompClient.subscribe(
      `/topic/auctionRoom/${auctionRoomId}`,
      (data) => {
        onSendBid2(data);
      },
    );
  });
};

export const sendBid = (
  priceBeforeBidding,
  priceStep,
  numberOfPriceStep,
  auctionRoomId,
) => {
  connection?.then(() => {
    stompClient?.send(
      "/topic/bid",
      JSON.stringify({
        auctionRoom: {
          id: auctionRoomId,
        },
        priceBeforeBidding: priceBeforeBidding,
        priceStep: priceStep,
        numberOfPriceStep: numberOfPriceStep,
      }),
      {},
    );
  });
};

export const connect = () => {
  if (connectedPromise !== null || alreadyConnectedOnce) {
    return;
  }
  connection = createConnection();

  const headers = {};
  let url = "http://localhost:8080/websocket";
  const authToken = localStorage.getItem("id_token");
  if (authToken) {
    url += "?access_token=" + authToken;
  }
  const socket = new SockJS(url);
  stompClient = Stomp.over(socket, { protocols: ["v12.stomp"] });
  stompClient.connect(headers, () => {
    connectedPromise("success");
    connectedPromise = null;
    alreadyConnectedOnce = true;
  });
};

// connect();
// setTimeout(() => {
//   subscribe();
//   setTimeout(() => {
//     sendBid();
//   }, 1000);
// }, 1000);
