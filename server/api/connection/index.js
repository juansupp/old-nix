'use strict';

var express = require('express');
var controller = require('./connection.controller');

var router = express.Router();

//COMUN
router.post('/q', controller.q);
router.post('/i', controller.i);
router.post('/u', controller.u);
//PROCEDURES
router.post('/eP', controller.eP);
router.post('/rP', controller.rP);


module.exports = router;
