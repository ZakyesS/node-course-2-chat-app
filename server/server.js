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
    
    // //crea evento NewMessage que recibirá el cliente.
    // socket.emit('newMessage', {
    //     from: 'server@server.com',
    //     text: 'Hello client.',
    //     createAt: 123
    // });

    // recibe evento createMessage del cliente.
    socket.on('createMessage', (message) => {
        console.log('Message back from client --> ', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()  //crea un nuevo timestamp.
        });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });

});

/* app.listen(port, () =>{  --> cuando se usa el http(como se almacenó en server) y se crea un servidor, 
    para luego decirle el puerto por el que escucha, se usa "server" en vez de "app".*/
server.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
});
