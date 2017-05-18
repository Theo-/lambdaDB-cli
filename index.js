#! /usr/bin/env node

var program = require('commander');

var signUp = require('./src/signup.js'),
    newDatabase = require('./src/new-database.js'),
    login = require('./src/login.js'),
    parseTemplate = require('./src/parse-template.js'),
    listDatabase = require('./src/list-database.js'),
    deleteDatabase = require('./src/delete-database.js'),
    init = require('./src/init.js');

program
.command('signup')
.description('Signup to LambdaDB')
.action(signUp)

program
.command('login <token>')
.description('Login to LambdaDB')
.action(login)

program
.command('new <databasename>')
.description('Create a new LambdaDB')
.action(newDatabase)

program
.command('delete <databasename>')
.description('Delete a LambdaDB')
.action(deleteDatabase)

program
.command('parse <template>')
.description('Parse a database template')
.action(parseTemplate)

program
.command('list')
.description('List all of your LambdaDB')
.action(listDatabase)

program
.command('init')
.description('Create a configuration file')
.action(init)

program.parse(process.argv)