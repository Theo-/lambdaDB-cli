var inquirer = require('inquirer'),
    clui = require('clui'),
    Spinner = clui.Spinner,
    LambdaDB = require('./lambdadb.js'),
    colors = require('colors'),
    fs = require('fs');

/**
 * Init a lambda project.
 */
module.exports = function() {
    var questions = [
    {
      name: 'dbname',
      type: 'input',
      default: null,
      message: 'Name of your project (will also be the name of the database)',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a name for the database';
        }
      }
    }
  ];

  inquirer.prompt(questions).then(function(answers) {
      var dbName = answers.dbname;

      var status = new Spinner('Setting up your database..');
      status.start();

      var ldb = LambdaDB();
      ldb.database(dbName).create().then(function() {
          status.message('Writing configuration file..');

          fs.writeFile('./lambdadb.json', `{
    "name": "${dbName}",
    "type": "database",
    "tables": []
}`, function(err) {
              status.stop();
              if(err) {
                return console.log(err);
              }
              console.log('Database ' + colors.green(dbName) + ' has been created.')
          }); 
      }, function(err) {
          status.stop();
          console.log(err);
      })
  });
}