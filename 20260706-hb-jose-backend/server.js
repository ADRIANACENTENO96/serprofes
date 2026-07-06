// 1. IMPORTAR HERRAMIENTAS 
const express = require ('express');
const app = express();

//2. NUESTRA BASE DE DATOS FALSA (EL CATALOGO) 
// Esto es un Array de objetos (JSON)
const inventario  = [
    {id: 1, articulo: "Portatil HP" , stock:15},
    {id: 2, articulo: "Monitor Dell", stock:5},
    {id: 3, articulo:"Teclado Mecanico", stock:22}

];
//3. LA RUTA (Camarero)
//Cuando alguien 'api/productos' le entregamos el  inventar

app.get('/api/productos', (req, res) => {
    //res.json convierte los datos para que el internet entienda
    res.json(inventario);
});

//4. ENCENDER EL SERVIDOR 
//Le decimos que escuche en el puerto 3000
app.listen(3000,() => { 
    console.log('🎉 servidor encendido y escuchando en el puerto 3000');
});