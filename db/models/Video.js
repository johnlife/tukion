const download_statuses = require('../../config/download_statuses');
const hostings = require('../../config/hostings');


module.exports = (Schemas, mongoose) => {
    return new mongoose.Schema({
        link: String,
        title: String,
        description: String,
        duration: String,
        tags: [String],
        views: Number,
        likes: Number,
        favorites: Number,
        comments: Number,
        thumbnail: String,
        channel: String,
        hosting: {
            type: String,
            default: null,
            enum: Object.keys(hostings),
        },
        download_status: {
            type: String,
            default: download_statuses.pending,
            enum: Object.values(download_statuses),
        },
        downloaded_url: String,
    });
};