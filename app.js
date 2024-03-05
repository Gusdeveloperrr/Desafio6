const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const fs = require("fs");
const viewsRouter = require("./views/routes/views.js");


app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");


app.use(express.static("public"));


app.use("/", viewsRouter);


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


const io = socket(server);


const productsFilePath = "./products.json";


function guardarProductos(productos) {
  fs.writeFile(productsFilePath, JSON.stringify(productos), (err) => {
    if (err) {
      console.error("Error al guardar el archivo products.json:", err);
    } else {
      console.log("Productos guardados exitosamente.");
    }
  });
}


let productos = [];


fs.readFile(productsFilePath, (err, data) => {
  if (err) {
    console.error("Error al leer el archivo products.json:", err);
  } else {
    productos = JSON.parse(data);
    console.log("Productos cargados exitosamente desde products.json.");
  }
});


io.on("connection", (socket) => {
  console.log("Nueva conexión WebSocket");

  
  socket.on("addProduct", (newProduct) => {
    
    
    productos.push(newProduct);

    
    guardarProductos(productos);

    
    io.emit("productAdded", newProduct);
  });

  
  socket.on("deleteProduct", (productId) => {
    
    
    productos.splice(productId, 1);

    
    guardarProductos(productos);

    
    io.emit("productDeleted", productId);
  });
});
