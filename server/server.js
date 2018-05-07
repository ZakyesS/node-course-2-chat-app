const path = require('path');   //no necesita ser instalado, tiene un constructor en el módulo.
// http -> librería que se usa para crear un servidor.
const http = require('http');   //no necesita ser instalado. Lo usa express behind the scenes.
const express = require('express');
// sockect.io -->  tiene libreria de front end y de back end
const socketIO = require('socket.io');  //librería que permite la comunicacion entre cliente y servidor y viceversa.

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');   //para que anide las rutas de directorios y se guarde la carpeta public en publicPath.
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app); 
/*en realidad CreateServer recoge una función con un req y res, pero como express 
lo usa detras de las scenes, se le puse pasar la app(que lo llama).*/
let io = socketIO(server);  //almacenamos en io el socket del server para luego usarlo.


app.use(express.static(publicPath));    //indicamos la ruta estática que vamos a usar y la use.

// permite registrar un evento de escucha y se puede escuchar por un evento especifico y hacer algo cuando éste ocurra.
io.on('connection', (socket) => {
    console.log('New user connected');
    
    //emite a todos los clientes.
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

    //Cuando se conecte un user, emite al resto que ya estaba conectado.
    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));        


    // recibe evento createMessage de los clientes.
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage --> ', message);
        
        //emite evento a los users conectados.
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();  //este mensaje le va a llegar al user, pero no al server.
    });

    socket.on('createLocationMessage', (coords) => {
        //emite evento para los usuarios conectados con las coordenadas del usuario que las envió.
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });


    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

server.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
});
