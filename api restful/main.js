const { response } = require('express');
const express = require('express');
const Contenedor = require('../Archivos/index');

const app = express();
const contenedor = new Contenedor('productos.txt');

app.get('/',(req, response)=>{
    response.send('Raiz principal');
});

const obtenerProductos = async ()=>{
    let auxProductos = await contenedor.getAll()
    return auxProductos;
}

const guardarProducto = async(objeto)=>{
    await contenedor.save(objeto);
    let productos = await obtenerProductos();
    return productos[productos.length-1];
}

const guardarProductoPorId = async(id, objeto)=>{
    await contenedor.updateById(id, objeto);
}

app.get('/productos', async(re, response)=>{
    response.send( await obtenerProductos());
});

app.get('/productos/:id', async (req, response)=>{
    let productos = await obtenerProductos();

    let retorno = productos.find(element => element.id ==  req.params.id);

    if (retorno != undefined){
        response.send( retorno);
    }else{
        response.send("No existe ese producto");
    }
});

app.use(express.json());    //esto es necesario para que nuestro post pueda recibir datos

app.post('/api/productos',async (req, res)=>{
    console.log('Post Requests recibido');
    let respuesta = await guardarProducto(req.body);
    res.send(respuesta);
});

app.put('/api/productos/:id', async (req, res)=>{
    console.log("Put Requests recibido");
    await guardarProductoPorId(req.params.id, req.body);    

    res.send("producto actualizado");
});

app.delete('/api/productos/:id', async (req, res)=>{  
    await contenedor.deleteById(req.params.id);
    res.send("producto eliminado");
});

const server = app.listen(8080, ()=>{
    console.log(`contectado al puerto http://localhost:${server.address().port}`);
});

server.on('error', (error)=>{
    console.log('Hubo un error');
    console.log(error);
});



