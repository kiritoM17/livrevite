'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//declaration des constantes.
const PORT = process.env.PORT || 5500 ;
const CORS_OPTS = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
const db = require('./src/models');
/*
@section import routes
*/
const userRoute = require('./src/routes/userRoute');
//initialisation de l'app
const app = express();

app.use(cors(CORS_OPTS));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//app user routes
app.use('/api/user',userRoute);

//other use
db.sequelize.sync().then(() => {
    app.listen(PORT, ()=> console.log(`application start good in port ${PORT}`));
});