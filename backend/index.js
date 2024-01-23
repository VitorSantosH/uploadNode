const express = require('express');
const routes = require('./src/routes/routes');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const multerConfig = require('./src/config/multer')

// instancia express
const app = express();
const port = 3333;


// database setup
/**
 * mongoose.connect('mongodb+srv://vitor:12345@cluster0.bbjiz.mongodb.net/uploadExemplo?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(res => {
    console.log("conectado ao atlas")
}).catch(err => console.log(err))

 * 
 */

//Rotas
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/',express.static('build2'))
app.post('/posts', multer(multerConfig).single('file'), (req, res) => {

    console.log("req.body")
    console.log(req)
    console.log('aqui')
})
//app.use(routes);





app.listen(port, () => {
    console.log("servidor funcionando na porta: " + port)
})