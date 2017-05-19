var Lambdadb = require('./lambdadb.js'),
    fs = require('fs'),
    clui = require('clui'),
    Spinner = clui.Spinner,
    chalk = require('chalk');

module.exports = function() {
    var ldb = Lambdadb();

    if(!fs.existsSync('./lambdadb.json')) {
        console.log(chalk.red('Could not find the ') + chalk.red.bold('lambdadb.json') + chalk.red(' file.'));
        return console.log('Make sure that file is present in the' + chalk.bold(' current directory.'));
    }
    
    var status = new Spinner('Deploying your LambdaDB database..');
    status.start();

    var templateString = fs.readFileSync('./lambdadb.json', 'utf8');
    var template = JSON.parse(templateString);

    ldb.template.fromJSON(template).then(function(res) {
        status.stop();

        if(!res.success) {
            return console.log(chalk.red(res.error));
        }

        console.log(chalk.green('Database ') + chalk.green.bold(template.name) + chalk.green(' has been deployed.'));
    }, function(err) {
        console.log(err);
    });
}