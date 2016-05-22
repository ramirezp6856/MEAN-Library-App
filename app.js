var express = require('express');

var sql = require('mssql');

var config = {
    user: 'ewok',
    password: 'ewok',
    server: '172.20.0.173',
    database: 'Books',
    options: {
    instancename: 'SQLEXPRESS'
  }
};
sql.connect(config, function(err){
    console.log(err);
})

var app = express();

var port = process.env.PORT || 5000;

var nav = [{
        Link: '/Books',
        Text: 'Books'
            }, {
        Link: '/Authors',
        Text: 'Authors'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);


app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

app.get('/books', function (req, res) {
    res.send('Hello Books!');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});