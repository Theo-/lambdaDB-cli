var Lambdadb = require('./lambdadb.js'),
    colors = require('colors');

module.exports = function(databasename) {
    var ldb = Lambdadb();

    ldb.database(databasename).create().then(function(result) {
        console.log(colors.green(databasename + ' has been created'));
    }, console.log)
}