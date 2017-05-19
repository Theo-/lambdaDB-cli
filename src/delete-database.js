var Lambdadb = require('./lambdadb.js'),
    colors = require('colors'),
    clui = require('clui'),
    inquirer = require('inquirer'),
    Spinner = clui.Spinner,
    chalk = require('chalk');

module.exports = function(databasename) {
    var ldb = Lambdadb();

    inquirer.prompt([
        {
            name: 'sure',
            type: 'confirm',
            message: 'Are you sure you want to delete ' + chalk.bold(databasename) + ' '
        }
    ]).then(function(answers) {
        if(!answers.sure) {
            return;
        }

        var message = new Spinner('Deleting ' + chalk.bold(databasename) + ' ..');
        message.start();

        ldb.database(databasename).drop().then(function(result) {
            message.stop();
            console.log(chalk.green.bold(databasename) + chalk.green(' has been dropped'));
        }, function(err) {
            message.stop();
            console.log(err);
        })
    })
}