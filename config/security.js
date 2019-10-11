const DataController = require('../http/DataController');


module.exports = require('lifeNode/http/security/config')({
    roles: {
        public: {
            // entities: ['Video'],
            api: [
                DataController.getVideos,
                DataController.addVideo,
                DataController.editVideo,
            ],
        }
    },
    auth: {
        modules: {
        },
    }

});