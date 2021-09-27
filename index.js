class Usuario{
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];       //obj[]
        this.mascotas = [];    //string[]
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`; 
    }

    //recibe el nombre de una mascota y lo añade al array de mascota
    addMascota(mascota){

        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        let auxObj = {
            nombre: nombre,
            autor: autor,
        }
        this.libros.push(auxObj);
    }

    getBookNames(){
        let auxNomLibros = [];

        this.libros.map((element)=>{
            auxNomLibros.push(element.nombre);
        });

        return auxNomLibros;
    }
}

const usuario = new Usuario('Ivan','Souza');
console.log(usuario.getFullName());


usuario.addMascota("Panchito");
console.log(usuario.countMascotas());


usuario.addBook('El hobbit','Tolkien');
usuario.addBook('Harry poter','Rowling');
usuario.addBook('El Alquimista','Coelho');

console.log(usuario);
console.log(usuario.getBookNames());