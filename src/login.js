var colors = require('colors'),
    LambdaDB = require('./lambdadb.js'),
    _ = require('underscore'),
    fs = require('fs'),
    os = require('os'),
    path = require('path');

module.exports = function(token) {
    var lambdadbPath = path.resolve(os.homedir(), '.lambdadb');
    if(!fs.existsSync(lambdadbPath)) fs.mkdirSync(lambdadbPath)

    try {
        //fs.unlink(path.resolve(lambdadbPath, 'credentials.json'));
    } catch(e) {
        // No problem
    }

    fs.writeFile(path.resolve(lambdadbPath, 'credentials.json'), JSON.stringify({
            host: 'https://lambdadb.herokuapp.com',
            secretToken: token
        }), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(colors.green('You are signed in!') + '\nTry ' + colors.blue('lambdadb list'));
    }); 
}