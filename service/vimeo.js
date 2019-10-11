const template = require('./_template');
const hostings = require('../config/hostings');
const worker = require('./workers/vimeo');

module.exports = require('lifeNode/service')({
    port: process.env.VIMEO_PORT || 8846,
    ...template(hostings.vimeo, worker),
});