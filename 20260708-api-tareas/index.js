//PRIMER SERVIDOR WEB CON EXPRESS
//1. Importamos la librería Express.
//Express nos permite crear servidores web de forma sencilla
const express = require("express");
//2. Creamos una aplicación con Express.
//La variable "app" será nuestro servidor
const app = express();
//3. Definmos el puerto donde escuchará el servidor
// En esta caso utilizaremos el puerto 3000
const PORT = 3000;
//4. Iniciamos el servidor
//listen() hace que el servidor quede esperando peticiones
//de los clientes (por ejemplo, desde un navegador)

//=================================================================
//MIDDLEWARE
//====================================================================
//Un middleware es una función que se ejecuta antes de llegar a las rutas
//expres.json()convierte automaticamente los datos enviados en formato 
//JSON es un objeto JavaScript.
//Gracias a este middleware podremos acceder a : 
// req.body
//cuando es cliente envie informacion mediante POST o PUT.
app.use(express.json());

//===========================================================
//BASE DE DATOS EN MEMORIA 
//============================================================
//Simulamos una base de datos utilizando un arreglo 
//IMPORTANTE:
//Los datos solo existen mientras el servidor esta encendido
//Si detenemos Node.js, toda la informacion se pierde
let tareas = [
    //Primera tarea
    {
        id: 1,
        titulo: "Aprender Express",
        completada: false
    },
    //Segunda tarea
    {
        id:2,
        titulo: "Estudiar Node.js",
        completada: true
    },
    //Tercera tarea
    {
        id:3,
        titulo: "Practicar Thunder Client",
        completada: false
    }
];

//======================================
//RUTA PRINCIPAL
//=========================================
app.get("/", (req, res)=> {
    res.send("🚀Bienvenido a la API REST de Tareas");

})


//===============================================
//GET - OBTENER TODAS LAS TAREAS 
//===============================================
//RUTA:
//GET /api/tareas
//Devuelve todas las tareas almacenadas.
app.get("/api/tareas", (req, res) => {
    //Codigo HTTP 200 = OK
    //json() convierte autamaticamente el arreglo 
    //en formato json
    res.status(200).json(tareas);
});

//GET- OBTENER UNA TAREA POR SU ID 
//======================================
//RUTA:
//"id" significa que el valor dinamico
app.get("/api/tareas/:id", (req, res) => {
    //req.params.id llega como texto.
    //parseInt() lo convierte a numero 
    const id = parseInt(req.params.id);
    //Buscamos la tarea cuyo id coincida.
    const tarea = tareas.find(t => t.id === id);
    //si no existe
    if(!tarea){
        //Codigo HTTP 404 = No encontrado
        return res.status(404).json ({
            mensaje: "La tarea no existe"
        });
    }
    //Si existe devolvemos la tarea
    res.status(200).json(tareas);
});


//=================================
//POST - CREAR UNA NUEVA TAREA
//============================
//Ruta:
//POST /api/tareas
//{"titulo": "Estudiar Express"}
app.post("/api/tareas", (req, res) => {
    //Extraemos que el titulo creado por el cliente
    const { titulo } = req.body;
    //validamos que el titulo exista
    if(!titulo) {
        //Codigo HTTP = Solicitud incorrecta
        return res.status(400).json({
        mensaje: "Debe indicar el titulo de la tarea"
        });
}
//Creamos un nuevo objeto 
const nuevaTarea = {
    //Generamos un id automatico
    id: tareas.length + 1,
    //Guardamos el titulo recibido.
    titulo,
    //Toda tarea nueva comienza incompleta
    completada: false
};
//Agregamos la nueva tarea al arreglo
tareas.push(nuevaTarea);
//Respondemos indicando que fue creada
res.status(201).json({
    mensaje: "Tarea creada correctamente",
    tarea: nuevaTarea
});

});





app.listen(PORT, () => {
    //5. Cuando el servidor se incicia correctamente,
    //mostramos un mensaje en la consola.
    console.log(`🎉Servidor ejecutándose en http://localhost:${PORT}`);
});