/* fichero para los scripts del index.html */

// io() se almacena en socket, porque es la conexion.
let socket = io(); 

socket.on('connect', function () {  //se usan regular functions porque cuando se vaya a ver en un navegador distinto a chrome se va a romper.
    console.log("Connected to server");

    // //crea evento createMessage que va a escucharlo el server.
    // socket.emit('createMessage', {
    //     from: 'client@example.com',
    //     text: 'Hello server.'
    // });

    
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});


//recibe el evento newMessage del server.
socket.on('newMessage', function (message) {
    console.log('Message back from server --> ', message);
});




