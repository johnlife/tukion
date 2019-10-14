const DataController = require('../http/DataController');


module.exports = require('lifeNode/http/security/config')({
    roles: {
        public: {
            entities: ['List'],
            api: [
                DataController.getLists,
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