const _ = require('lodash');

module.exports.fromObject = preloads => ({
    'Link' : Object.keys(preloads).map(url => `<${url}>; as=${preloads[url]}; rel=preload`).join(', '),
});

module.exports.fromArray = (urls, type) => ({
    'Link' : urls.map(url => `<${url}>; as=${type}; rel=preload`).join(', '),
});

