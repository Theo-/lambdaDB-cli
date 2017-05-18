var Lambdadb = require('./lambdadb.js'),
    colors = require('colors'),
    clui = require('clui'),
    Spinner = clui.Spinner,
    chalk = require('chalk');

module.exports = function(databasename) {
    var ldb = Lambdadb();
    var message = new Spinner('Deleting ' + chalk.bold(databasename) + ' ..');
    message.start();

    ldb.database(databasename).drop().then(function(result) {
        message.stop();
        console.log(chalk.green.bold(databasename) + chalk.green(' has been dropped'));
    }, function(err) {
        message.stop();
        console.log(err);
    })
}