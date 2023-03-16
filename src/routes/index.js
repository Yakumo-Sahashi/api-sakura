const {Router} = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');
//const datos = require('../db.json');
const datos = JSON.parse(fs.readFileSync('./db.json'));

router.get('/', (req, res) => {
    res.json(datos);
});

const escribir = (dt) => {
    fs.writeFile('db.json',JSON.stringify(dt), error => {
        if(!error){
            res.status(500).json('Error al actualizar api');
        }
    });
}

router.post('/', (req, res) => {
    const {title, descripcion, link1} = req.body;
    if(title && descripcion && link1){
        const id = datos.length + 1
        const newContenido = {...req.body, id};
        datos.push(newContenido);
        res.json(datos);
    }else{
        res.status(500).json('peticion erronea');
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
    res.json(datos);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {title, descripcion, link1, comentario} = req.body;
    if(title && descripcion && link1){
        _.each(datos, (dato, i) => {
            if(dato.id == id){
                dato.title = title;
                dato.descripcion = descripcion;
                dato.link1 = link1;
                if(comentario){
                    dato.comentarios.push(comentario);
                }
            }
        });
        res.json(datos);
        escribir(datos);
    }else{
        res.status(500).json('Error');
    }
});

module.exports = router;