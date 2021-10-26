const fs = require('fs');

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    } 

    async save(object){
        let objetos = await this.getAll();
        object = {id: objetos.length + 1, ...object};
        objetos.push(object);

        try
        {
            await fs.promises.writeFile(this.fileName, JSON.stringify(objetos,null,4));        
        }
        catch (error)
        {
            throw new Error('No se pudo guardar el objeto');
        }
    }  

    async getById(id){
        const object = await this.getAll();
        return object.find(element => element.id === id);
    }

    async updateById(id,object){
        let newObject = { id: parseInt(id), ...object};
        let listObjects = await this.getAll();
        let retorno = {
            mensaje: '',
            response: {}
        }

        try
        {
            if ((id-1) < listObjects.length){
                listObjects.splice((id-1), 1, newObject);
                retorno.mensaje = 'Objeto actualizado correctamente';
                retorno.response = object;
            }else{
                retorno.mensaje = 'no se pudo actualizar el objeto, asegurese que es objeto exista en la lista';
                retorno.response = object;
            }
            await fs.promises.writeFile(this.fileName, JSON.stringify(listObjects,null,4));        
        }
        catch (error)
        {
            throw new Error('No se pudo guardar el objeto');
        }
        return retorno;
    }

    async getAll(){
        try
        {
            const response = await fs.promises.readFile(this.fileName, 'utf-8');
            return JSON.parse(response);
        }
        catch(error)
        {
            await fs.promises.writeFile(this.fileName, JSON.stringify([],null,4));
            const response = await fs.promises.readFile(this.fileName, 'utf-8');
            return JSON.parse(response);
        }
    } 

    async deleteById(id){
        const object = await this.getAll();
        let response = {
            mensaje: '',
            response: {}
        }

        if((id) < object.length + 1 ){
            response.response = await this.getById(id);
            const newArray = object.filter((element) => element.id != id);
            await fs.promises.writeFile(this.fileName, JSON.stringify(newArray,null,4));
            response.mensaje = 'Producto eliminado'     
            return response;
        }else{
            response.mensaje = 'Producto no encontrado';
            response.response = {id: id};
            return response;
        }
    }

    async deleteAll(){
        try
        {
            await fs.promises.writeFile(this.fileName, JSON.stringify([],null,4));
        }
        catch (error)
        {
            throw new Error('No se pudo borrar todo');
        }
    }
}

module.exports = Contenedor;