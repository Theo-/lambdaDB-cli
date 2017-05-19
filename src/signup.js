var colors = require('colors'),
    LambdaDB = require('./lambdadb.js'),
    _ = require('underscore'),
    fs = require('fs'),
    inquirer = require('inquirer'),
    os = require('os'),
    path = require('path'),
    chalk = require('chalk'),
    request = require('request');

module.exports = function() {
    var lambdadbPath = path.resolve(os.homedir(), '.lambdadb');
    if(!fs.existsSync(lambdadbPath)) fs.mkdirSync(lambdadbPath)

    try {
        //fs.unlink(path.resolve(lambdadbPath, 'credentials.json'));
    } catch(e) {
        // No problem
    }

    inquirer.prompt([
        {
            type: 'string',
            name: 'username',
            message: 'Username:'
        },
        {
            type: 'password',
            name: 'password',
            message: 'Password:'
        }
    ]).then(function(answers) {

        request({
            method: 'POST',
            url: 'https://lambdadb.herokuapp.com/users',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: answers.username,
                password: answers.password
            })
        }, function(err, res) {
            if(err) {
                console.log(chalk.red(err.message));
            }

            var response = JSON.parse(res.body);
            if(!response.success) {
                return console.log(chalk.red(response.error));
            }

            // Now login
            request({
                method: 'POST',
                url: 'https://lambdadb.herokuapp.com/users/login',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: answers.username,
                    password: answers.password
                })
            }, function(err, res) {
                if(err) {
                    throw err;
                }

                var response = JSON.parse(res.body);
                var secretToken = response.data.secretToken;

                fs.writeFile(path.resolve(lambdadbPath, 'credentials.json'), JSON.stringify({
                    host: 'https://lambdadb.herokuapp.com',
                    secretToken: secretToken
                }), function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    console.log(colors.green('You are signed in!') + '\nTry ' + colors.blue('lambdadb list'));
                });
            })
        })
    })
}