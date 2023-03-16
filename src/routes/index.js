const {Router} = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');
//const datos = require('../db.json');
const datos = JSON.parse(fs.readFileSync('./db.json'));

router.get('/', (req, res) => {
    res.status(200).json(datos);
});

const escribir = (dt) => {
    fs.writeFile('db.json',JSON.stringify(dt), error => {
        return error;
    });
}

router.post('/', (req, res) => {
    const {titulo, descripcion} = req.body;
    if(titulo && descripcion){
        req.body.enlaces = req.body.enlaces != "" ? req.body.enlaces.split(',') : [];
        req.body.comentarios = [];
        const id = datos.length + 1
        const newContenido = {...req.body, id};
        datos.push(newContenido);
        if(escribir(datos)){
            res.status(500).json('Error!\nAl actualizar los datos');
        }else{
            res.status(200).json(datos); 
        }
    }else{
        res.status(500).json('Se deben llenar todos los campos');
    }
    escribir(datos);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(datos, (dato, i) => {
        if(dato.id == id){
            datos.splice(i,1);
        }
    });
    if(escribir(datos)){
        res.status(500).json('Error al actualizar api');
    }else{
        res.status(200).json(datos); 
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {titulo, descripcion, enlaces, fecha} = req.body;
    if(titulo && descripcion && enlaces, fecha){
        _.each(datos, (dato, i) => {
            if(dato.id == id){
                dato.titulo = titulo;
                dato.descripcion = descripcion;
                dato.enlaces = enlaces.split(',');
                dato.fecha = fecha;
            }
        });
        if(escribir(datos)){
            res.status(500).json('Error al actualizar api');
        }else{
            res.status(200).json(datos); 
        }
    }else{
        res.status(500).json('Error\nDatos incompletos');
    }
});

router.put('/comentario/:id', (req, res) => {
    const { id } = req.params;
    const {comentario} = req.body;
    if(comentario){
        _.each(datos, (dato, i) => {
            if(dato.id == id){
                dato.comentarios.push(comentario);
            }
        });
        if(escribir(datos)){
            res.status(500).json('Error al actualizar api');
        }else{
            res.status(200).json(datos); 
        }
    }else{
        res.status(500).json('Error\nDatos incompletos');
    }
});

module.exports = router;