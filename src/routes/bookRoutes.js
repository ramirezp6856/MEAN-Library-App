var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

/*var sql = require('mssql');*/

var router = function (nav) {
    /*var books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
    },
        {
            title: 'A,B,C with Big Bird',
            genre: 'Educational',
            author: 'Greg P. Sam',
            read: false
    },
        {
            title: 'Duck, Duck, Goose',
            genre: 'Fiction',
            author: 'Walter White',
            read: false
    },
        {
            title: 'The Amazing Average Guy',
            genre: 'Fiction',
            author: 'Bernard Bacon',
            read: false
    },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
    },
        {
            title: 'Peter and his Petunias',
            genre: 'Biography',
            author: 'Jessica Holiday',
            read: false
    }
];*/

    bookRouter.route('/')
        //MongoDB QUERY
        .get(function (req, res) {

            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(
                    function (err, results) {
                        res.render('bookListView', {
                            title: 'Hello from render',
                            nav: nav,
                            books: results
                        });
                    });
            });

            /*
            //SQLEXPRESS QUERY
            console.log('book router');
            var request = new sql.Request();
            request.query('select * from books',
                function (err, recordset) {
                    res.render('bookListView', {
                            title: 'Hello from render',
                            nav: nav,
                            books: recordset
                });*/
        });

    /*
    //SQLEXPRESS QUERY
    .get(function (req, res) {
        console.log('book router');
        var request = new sql.Request();
        request.query('select * from books')
            .then(
                function (recordset) {
                    console.log(recordset);
                    res.render('bookListView', {
                        title: 'Hello from render',
                        nav: nav,
                        books: recordset
                    });
                })
            .catch(function (err) {
                console.log(`sql err ${err}`);
            });
    });
    */

    bookRouter.route('/:id')
        .all(function (req, res, next) {
            var id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int)
            ps.prepare('select * from books where id = @id',
                function (err) {
                    ps.execute({
                            id: req.params.id
                        },
                        function (err, recordset) {
                            if (recordset.length === 0) {
                                res.status(404).send('Not Found')
                            } else {
                                req.book = recordset[0];
                                next();
                            }
                        });
                });
        })
        .get(function (req, res) {
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: req.book
            });
        });
    return bookRouter;
};
module.exports = router;