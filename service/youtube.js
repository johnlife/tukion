const template = require('./_template');
const hostings = require('../config/hostings');
const worker = require('./workers/youtube');

module.exports = require('lifeNode/service')({
    port: process.env.YOUTUBE_PORT || 8845,
    ...template(hostings.youtube, worker),
});