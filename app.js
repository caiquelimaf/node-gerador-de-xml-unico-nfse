const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/img', express.static('img'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

//Rotas
app.get('/', function(req, res){
    res.render('cbar');    
});

app.post('/post-data', function(req, res){
    gerar();
    //res.render('cbar');
    return res.redirect('/');
});



app.listen(9090);

