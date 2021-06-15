const io = require("socket.io-client");

const token = "user's-jwt-token";
const url = "http://localhost:3040";
const path = `${url}`;
console.log("path", path);

const socket = io.connect(path, {
  path: "/sio",
  transports: ["websocket"],
});
console.log(socket);
socket.on("connection", function (message) {
  console.log("connected", message);
});
// socket.on("userConnected", function (message) {
//   console.log("Notification!!!", message);
// });