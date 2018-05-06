const path = require('path');   //no necesita ser instalado, tiene un constructor en el módulo.
// http -> librería que se usa para crear un servidor.
const http = require('http');   //no necesita ser instalado. Lo usa express behind the scenes.
const express = require('express');
// sockect.io -->  tiene libreria de front end y de back end
const socketIO = require('socket.io');  //librería que permite la comunicacion entre cliente y servidor y viceversa.

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
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app!.',
        createAt: new Date().getTime()
    });

    // Cuando se conecte un user, emite al resto que ya estaba conectado.
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined.',
        createAt: new Date().getTime()
    });
    
            
    // recibe evento createMessage del cliente.
    socket.on('createMessage', (message) => {
        console.log('createMessage --> ', message);
        
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()  //crea un nuevo timestamp.
        });
        //broadcast
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime() 
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

server.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
});
