var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
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
];

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
            //res.send('inserting books');
        });

    return adminRouter;
};

module.exports = router;