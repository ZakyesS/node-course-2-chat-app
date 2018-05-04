const path = require('path');   //no necesita ser instalado, tiene un constructor en el módulo.
const express = require('express');

const publicPath = path.join(__dirname, '../public');   //para que anide las rutas de directorios y se guarde la carpeta public en publicPath.
const port = process.env.PORT || 3000;
let app = express();

app.use(express.static(publicPath));    //indicamos la ruta estática que vamos a usar y la use.

app.listen(3000, () =>{
    console.log(`Server is up on port ${port}`);
});
