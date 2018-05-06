/* fichero para los scripts del index.html */

// io() se almacena en socket, porque es la conexion.
let socket = io(); 

socket.on('connect', function () {  //se usan regular functions porque cuando se vaya a ver en un navegador distinto a chrome se va a romper.
    console.log("Connected to server");
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('NewMessage --> ', message);
});




