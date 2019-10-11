const _ = require('lodash');
const express = require('express');
const router = express.Router();
const routes = require('../../frontend/js/routes.json');
const http2push = require('../../utils/http2push');
const ObjectIdTester = require('../../config/Constants').ObjectIdTester;

const headers = http2push.fromObject({
    '/js/vendor.js' : 'script',
    '/js/app.js' : 'script',
});
['/', ...routes.map(route=>route.path)].forEach(url => {
    router.get(url, function(req, res, next) {
        if (Object.values(req.params)
            .flatMap(param => param.split(/[,.]/))
            .reduce((valid, param) => (valid && ObjectIdTester.test(param)), true)
        ) { //if all params are valid ObjectIDs
            // const useragent = req.headers['user-agent'];
            // if (
            //     useragent.includes('Googlebot') ||
            //     useragent.includes('AdsBot-Google') ||
            //     useragent.includes('Mediapartners-Google')
            // ) {
            //     ssr(url, req, res);
            // } else {
                res.set(headers).render('app');
            // }
        } else {
            next();
        }
    });
});

module.exports = router;
