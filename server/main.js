const express = require('express');
const Contenedor = require('../Archivos/index');

const app = express();
const contenedor = new Contenedor('productos.txt');

app.get('/',(req, response)=>{
    response.send('Raiz principal');
});

const obtenerProductos = async ()=>{
    return await contenedor.getAll()
}

app.get('/productos',(re, response)=>{
    response.send( obtenerProductos());  
});

app.get('/productosRandom',(re, response)=>{
    //response.send('mis cosas');
});

const server = app.listen(8080, ()=>{
    console.log(`contectado al puerto ${server.address().port}`);
});

server.on('error', (error)=>{
    console.log('Hubo un error');
    console.log(error);
});



