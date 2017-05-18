var colors = require('colors'),
    LambdaDB = require('./lambdadb.js'),
    _ = require('underscore');

module.exports = function() {
    var ldb = LambdaDB();
    console.log("DATABASES:")

    ldb.database().list().then(function(dbs) {
        _.each(dbs.data, function(db) {
            console.log(colors.green(db.Db+":"));
            console.log('\t host: '+db.Host);
            console.log('\t privileges: ALL but GRANT')
        });
    })
}