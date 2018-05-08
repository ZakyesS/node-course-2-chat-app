/* fichero para los scripts del index.html */

// io() se almacena en socket, porque es la conexion.
let socket = io(); 

// funcion para calcular el scroll y que se haga automático.
function scrollToBottom () {
    //Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');    //mete el último mensaje de la lista.
    //Heights
    let clientHeight = messages.prop('clientHeight'); // el alto de lo que se ve. 
    let scrollTop = messages.prop('scrollTop'); // espacio entre clientHeight(lo que se ve) y el principio de la window.
    let scrollHeight = messages.prop('scrollHeight');   // el alto de toda la window.
    let newMessageHeight = newMessage.innerHeight();    // al hijo le una el tamaño(total) de la window.
    let lastMessageHeight = newMessage.prev().innerHeight();    //al hijo le una el tamaño(total) previo de la window.

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);   //aquí hace el auto-scrolling.
    }
};


socket.on('connect', function () {  //se usan regular functions porque cuando se vaya a ver en un navegador distinto a chrome se va a romper.
    //console.log("Connected to server");
    let params = jQuery.deparam(window.location.search);    //para coger la url y poder acceder al name y al room introducidos.

    //emite evento cuando user se una a canal.
    socket.emit('join', params, function(err) {
        if(err){
            alert(err);
            window.location.href = '/';
        }
        else{
            console.log('No error');
        }
    });
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
    scrollToBottom(); // llama a la funcion para hacer auto-scroll
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
    scrollToBottom();
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