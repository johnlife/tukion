// const translator = require('./middleware/translator');
// const shopMiddleware = require('./middleware/shop');
// const langRouter  = require('./routes/language');

module.exports = {
    https: false,
    secret: `Y_D&H%3+k4.Z88932hfhH_(#&^$KJH)(ASMNBosdmn23987|0I*"9bL|!q_cQ3rz(<D'T>C~0G3UW`,
    static: {
        '/storage':'/storage/public',
        '/':'/public',
    },
    security: require('../config/security'),
    worker: app => {
        app.get('/storage/*', (req, res) => { //default image if not found
            res.status(404).send({error: 'not found'});
        });
        // app.use(translator.middleware);
        //
        // app.use('/lang', langRouter(app));
        // app.use('/user', require('./routes/user')); //should be BEFORE appRouter to intercept protected pages
        app.use('/', require('./routes/app'));
        // app.use('/admin', require('./routes/admin'));
        // app.use('/proxy', require('./routes/proxy'));
        // app.use('/blog', require('./routes/blog'));
    },
};
