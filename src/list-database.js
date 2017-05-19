var colors = require('colors'),
    LambdaDB = require('./lambdadb.js'),
    _ = require('underscore'),
    Table = require('cli-table2'),
    chalk = require('chalk');

module.exports = function() {
    var ldb = LambdaDB();
    console.log(chalk.bold("Database from your LambdaDB account:"))

    var table = new Table({
        head: ['Name', 'Host', 'Privileges'],
        colWidths: [30, 10, 20]
    })

    ldb.databases().then(function(dbs) {
        _.each(dbs.data, function(db) {
            table.push(
                [db.Db, db.Host, 'ALL but GRANT']
            )
        });

        console.log(table.toString());

        console.log('Delete a table using ' + chalk.underline('lambdadb delete <name>'))
        console.log('Create a new table using ' + chalk.underline('lambdadb new <name>'))
    })
}