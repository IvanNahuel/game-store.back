const express = require('express');
const Contenedor = require('../Archivos/index');

const app = express();
const contenedor = new Contenedor('productos.txt');

app.get('/',(req, response)=>{
    response.send('Raiz principal');
});

const obtenerProductos = async ()=>{
    let auxProductos = await contenedor.getAll()
    console.log(auxProductos);
    return auxProductos;
}

app.get('/productos', (re, response)=>{
    console.log("A");
    response.send( obtenerProductos());
    console.log("B");
});

/*
app.get('/api/letras/:num',(req, response)=>{       
    response.json({
        result: frase[req.params.num],
    });
});*/

app.get('/productos/:id',(req, response)=>{
    //TO DO: en base al ID, buscamos y retornamos el deseado
    //[req.params.num]    
    /*
    response.json({
        result: 
    });
    */
    //response.send( obtenerProductos());  
});

/* 
TO DO : hacer el post y el put, el mensaje lo recibe a traves del req, y hacer un metodo 
en el main que actualice esa data y updatee esa data
UwU:D
 */

const server = app.listen(8080, ()=>{
    console.log(`contectado al puerto http://localhost:${server.address().port}`);
});

server.on('error', (error)=>{
    console.log('Hubo un error');
    console.log(error);
});



