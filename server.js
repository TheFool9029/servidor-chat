const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Cuando un usuario se conecta
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Cuando envía un mensaje
  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);

    // Reenvía el mensaje a TODOS los usuarios conectados
    io.emit("mensaje", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

// Ruta para probar desde el navegador
app.get("/", (req, res) => {
  res.send("Servidor de Chat funcionando ✅");
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});