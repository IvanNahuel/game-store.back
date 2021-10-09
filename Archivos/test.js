const Contenedor = require('./index');

const contenedor = new Contenedor('producto.txt');

const test = async ()=>{
    /*
    console.log( await contenedor.save({title: 'Escuadra', price: 'sou', price: 123, thumbnail: "http://"}));
    console.log( await contenedor.save({title: 'Calculadora', price: 'sou', price: 234, thumbnail: "http://"}));
    console.log( await contenedor.save({title: 'Globo terraqueo', price: 'sou', price: 345, thumbnail: "http://"}));
    ¨*/

    console.log( await contenedor.getById(1));
    console.log( await contenedor.getAll());
    console.log( await contenedor.deleteById(1));
    console.log( await contenedor.getAll());
    console.log( await contenedor.deleteAll());
}
test();