'use strict';

const db = require('lifeNode/data/db');
const _ = require('lodash');
const models = db.models;
// const mongoose = db.mongoose;
const hostings = require('../config/hostings');
const youtube = require('../service/youtube').interface;
const vimeo = require('../service/vimeo').interface;

const hostingToServiceMapper = {youtube, vimeo};

module.exports = {
    getVideos: {
        url: '/data/videos',
        handler() {
            return models.Video.find().lean().exec();
        },
    },
    getLists: {
        url: '/data/lists',
        handler() {
            return models.List.find()
                .populate('videos')
                .lean().exec();
        },
    },
    addVideo: {
        url: '/data/video',
        method: 'post',
        async handler({body}) {
            const {link} = body;
            const hosting = Object.values(hostings)
                .find(hosting => hosting.url_pattern.test(link));
            if (hosting) {
                const service = hostingToServiceMapper[hosting.name];
                if (service) {
                    return (await service.post('/add', body)).data;
                } else {
                    res.status(500).send({error: `Hosting ${hosting.name} doesn't have a service associated`});
                }
            } else {
                res.status(422).send({error: `Url ${link} doesn't look like anything we know`, known_hostings: Object.keys(hostings)});
            }
        },
    },
    editVideo: {
        url: '/data/video/:videoId',
        method: 'post',
        handler({videoId, body}) {
            const {title, description} = body; //we're explicit for security reasons
            const update = {};
            if (title) update.title = title;
            if (description) update.description = description;
            return models.Video.findByIdAndUpdate(videoId, update, {new: true}).lean().exec();
        },
    },
};