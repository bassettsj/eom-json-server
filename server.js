'use strict';

const jsonServer = require('json-server');
const express = require('express');
const rewrite = require('express-urlrewrite');
const _ = require('lodash');

var server = jsonServer.create();
var router = jsonServer.router();

var db = router.db;

db('home').insert(require('./resources/home.json'));
db('categories').insert(require('./resources/categories.json'));

server.use(jsonServer.defaults);
server.use('/mobile', express.static(__dirname + '/../eomobile-binder/eomobile-frontend/www'));
server.use(rewrite('/mobile/api/v0/home', '/home/' + 1));
server.use(rewrite('/mobile/api/v0/metadata/categories*', '/categories'))
server.use(router);
server.listen(3000, function() {
    console.info('Server listening to port 3000');
});
