var express = require('express');
// hay que hacer npm install express --save (con --save lo que hace es meterlo en el package .json)

var app = express(); // la aplicación express que estamos creando

// https://expressjs.com/es/ infraestructura web rápida y minimalista para node

var server = require('http').Server(app);

var io = require('socket.io')(server); // npm install socket.io --save


// Creamos array con mensajes (para ejemplo, en PRO mejor con BBDD)

var messages = [{
    id:1,
    text: "Bienvenido al canal de prueba",
    author: "Master del universo"
}]


// Con esto lo que hacemos es, que cada vez que se reciba un get al directorio raíz (/) se muestre el mensaje

app.use(express.static('public'));

app.get('/', function(req,res){
    res.status(200).send("Servidor corriendo");
});

//instalar nodemon (npm i nodemon -D)
// en package.json, añadir el script "start": "nodemon server/main.js"
// con ello, al hacer npm start, ya se ecutará este script y se refrescarán automáticamente los cambios que realicemos en el servidor sin necesidad de
// reiniciar la aplicación


// comenzamos a escuchar
io.on('connection',function(socket){
    console.log("Alguien se ha conectado con Sockets");
    // emitimos el evento para que lo escuche el socket
    socket.emit('messages',messages);
    // escuchamos el evento de nuevo mensaje y hacemos algo con los datos que nos pasan
    socket.on('newmessage',function(data){
    // añadimos en el array mensajes ese nuevo mensaje
        messages.push(data);
    io.sockets.emit('messages',messages); // enviamos el mensaje a todos los clientes conectados al socket!
    });  

});

// Por otro lado tendrá que haber una página web con un código javascript que envíe ese mensaje "connection"
// Ello se creará en la carpeta public

// para poder usar la parte pública usaremos un middleware que trae express y que se llama Static (ver línea 14 app.use....)

// Esto siempre al final para que el servidor se ponga a escuchar
server.listen(1231, function(){
    console.log("Servidor funcionando en http://localhost:1231");
});
// para ejecutarlo, desde consola, node server/main.js

