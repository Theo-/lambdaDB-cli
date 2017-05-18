var lambda = require('lambdadb'),
    path = require('path'),
    os = require('os');

module.exports = function() {
    try {
        var lambdadbPath = path.resolve(os.homedir(), '.lambdadb');
        var config = require(path.resolve(lambdadbPath, 'credentials.json'));
    } catch(e) {
        console.log('YOU ARE NOT LOGGED IN');
        return null;
    }   
    return lambda(config);
}