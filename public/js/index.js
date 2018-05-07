/* fichero para los scripts del index.html */

// io() se almacena en socket, porque es la conexion.
let socket = io(); 

socket.on('connect', function () {  //se usan regular functions porque cuando se vaya a ver en un navegador distinto a chrome se va a romper.
    console.log("Connected to server");
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

//recibe evento del server.
socket.on('newMessage', function (message) {
    console.log('NewMessage --> ', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li); // # --> para coger por id(coge el id messages del ol del index.html).
    // append() --> añadir contenido al elemento que se le especifique.
});

/* Cuando emita el evento, éste se lo enviará al server y él lo distribuirá al resto de usuarios conectados.*/
jQuery('#message-form').on('submit', function(e) {  // # --> para coger por id(coge el formulario message form del index.html).
    //e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        /*como en el input del form del index.html hay un campo name ="message", con el jQuery
        recoge lo que se introduzca y lo mete en text: para eviarlo al server.*/
        text: jQuery('[name=message]').val()    //val() --> obtener valor de name.
    }, function() {

    });
});
