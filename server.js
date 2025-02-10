const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("Un usuario se conectó:", socket.id);

  socket.on("message", (data) => {
    console.log("Mensaje recibido:", data);
    io.emit("message", data); // Envía el mensaje a todos los clientes
  });

  socket.on("disconnect", () => {
    console.log("Un usuario se desconectó:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
