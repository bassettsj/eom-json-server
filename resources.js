'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const stringify = require('lowdb').stringify;

function prettyifyResources() {
    var dir = path.join(__dirname, '/resources');
    return fs.readdirAsync(dir)
        .filter(function(fileName) {
            return path.parse(fileName).ext === '.json';
        })
        .map(function(fileName) {
            var filePath = path.join(dir, fileName);
            return fs.readFileAsync(path.join(dir, fileName), 'utf8')
                .then(JSON.parse)
                .then(stringify)
                .then(function(data) {
                    console.log(data);
                    return fs.writeFileAsync(filePath, data, {encoding: 'utf8'});
                });
        }, console.error)
        .then(console.log());
}
