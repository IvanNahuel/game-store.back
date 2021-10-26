const { response } = require('express');
const express = require('express');
const { Router } = express;
const Contenedor = require('../Archivos/index');

const app = express();
const router = Router();

const contenedor = new Contenedor('productos.txt');


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
    return await contenedor.updateById(id, objeto);
}

router.get('/',(req, response)=>{
    response.send({mensaje:'Raiz principal'});
});

router.get('/productos', async(re, response)=>{
    response.send( await obtenerProductos());
});

router.get('/productos/:id', async (req, response)=>{
    let productos = await obtenerProductos();

    let retorno = productos.find(element => element.id ==  req.params.id);

    if (retorno != undefined){
        response.send({
            mensaje:"Producto encontrado",
            response: retorno
        });
    }else{
        response.send({
            mensaje:"Error",
            response:"No existe ese producto"
        });
    }
});

app.use(express.json());    //esto es necesario para que nuestro post pueda recibir datos

router.post('/productos',async (req, res)=>{
    console.log('Post Requests recibido');
    let respuesta = await guardarProducto(req.body);
    res.send({
        mensaje: 'Producto guardado correctamente',
        response: respuesta});
});

router.put('/productos/:id', async (req, res)=>{
    res.send(await guardarProductoPorId(req.params.id, req.body));
});

router.delete('/productos/:id', async (req, res)=>{    
    res.send(await contenedor.deleteById(req.params.id));
});

app.use('/api', router);

const server = app.listen(8080, ()=>{
    console.log(`contectado al puerto http://localhost:${server.address().port}`);
});

server.on('error', (error)=>{
    console.log('Hubo un error');
    console.log(error);
});



