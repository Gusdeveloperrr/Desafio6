const express = require('express');
const router = express.Router();
const fs = require('fs');


const productsFilePath = './products.json';


router.get('/', (req, res) => {
    
    fs.readFile(productsFilePath, (err, data) => {
        if (err) {
            console.error('Error al leer el archivo products.json:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        
        const products = JSON.parse(data);

        
        res.render('index', { productos: products });
    });
});


router.get('/realtimeproducts', (req, res) => {
    
    fs.readFile(productsFilePath, (err, data) => {
        if (err) {
            console.error('Error al leer el archivo products.json:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        
        const products = JSON.parse(data);

        
        res.render('realTimeProducts', { productos: products });
    });
});


router.post('/addproduct', (req, res) => {
    
    
    res.send('Agregar producto: ' + req.body);
});


router.delete('/deleteproduct/:id', (req, res) => {
    const productId = req.params.id;
    
    res.send('Eliminar producto con ID: ' + productId);
});

module.exports = router;
