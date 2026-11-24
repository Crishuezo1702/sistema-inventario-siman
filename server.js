const express = require('express');
const productoRoutes = require('./routes/productoRoutes')

console.log('conexion cargada correctamente')

const app = express();

app.use(express.json())

const PORT = 8080;

app.use(productoRoutes)
app.use(express.static('public'))

app.get("/", (req,res) => {
    res.send("Sistema de inventario de SIMAN")
})

app.listen(PORT, ()=> {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`)
})