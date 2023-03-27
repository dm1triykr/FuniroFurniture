'use strict';

const { src, dest } = require('gulp');
const config = require('./gulp/config');
var plumber = require('gulp-plumber');

require('require-dir')('./gulp', {recurse: true});