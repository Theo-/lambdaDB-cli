var colors = require('colors'),
    LambdaDB = require('./lambdadb.js'),
    _ = require('underscore'),
    Table = require('cli-table2'),
    chalk = require('chalk');

module.exports = function() {
    var ldb = LambdaDB();
    console.log(chalk.bold.green("LambdaDB account:\n------------"))

    ldb.me().then(function(info) {
        var account = info.data;

        console.log(chalk.bold('LambdaDB user: ') +account.username);
        console.log(chalk.bold('SQL user: ') +account.sql_role);
        console.log(chalk.bold('SQL password: ') + account.sql_password);
        console.log(chalk.bold('SQL Server: ') + account.sql_server);
        console.log(chalk.bold('Secret Token: ') + account.secretToken);
    })
}