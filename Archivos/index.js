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
        const newArray = object.filter(element => element.id !== id);
        await fs.promises.writeFile(this.fileName, JSON.stringify(newArray,null,4));
        return id;
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