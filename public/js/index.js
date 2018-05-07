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
    
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    // append() --> añadir contenido al elemento que se le especifique.
    jQuery('#messages').append(html);

});

// recibe evento de localizacion del server.
socket.on('newLocationMessage', function(message) {
   
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    jQuery('#messages').append(html);
});

/* Cuando emita el evento, éste se lo enviará al server y él lo distribuirá al resto de usuarios conectados.*/
jQuery('#message-form').on('submit', function(e) {  // # --> para coger por id(coge el formulario message form del index.html).
    e.preventDefault(); // si no está esta línea, el usuario que envía un mensaje, se vuelve a conectar, actualizándosele la pág.

    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        /*como en el input del form del index.html hay un campo name ="message", con el jQuery
        recoge lo que se introduzca y lo mete en text: para eviarlo al server.*/
        text: messageTextbox.val()    //val() --> dale valor vacío.
    }, function() {
        messageTextbox.val('');
    });
});


let locationButton = jQuery('#send-location');  //almacenamos el botón send-location cogiendo el id.
locationButton.on('click', function() {
    if(!navigator.geolocation){         //si los navegadores antiguos no soportan la localización.
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...');    //desabilitar boton y poner texto.

    /*El navigator.greolocation va a tener 2 arg: 
    1- funct si hay éxito.
    2- funct si no lo hay.
    */
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');  //habilitar boton de nuevo y pone texto.
        //emite evento createLocationMessage al server.
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    }); 
});