const fs = require('fs');
const downloader = require('youtube-dl');
const UUID = require('pure-uuid');
const db = require('lifeNode/data/db');
const download_statuses = require('../../config/download_statuses');
const hostings = require('../../config/hostings');
const models = db.models;

const secondsToString = sec => {
    // console.log(sec);
    try {
        const date = new Date(null);
        date.setSeconds(sec);
        return date.toISOString().substr(11, 8);
    } catch (e) {
        console.warn(e);
        return sec;
    }
};

const hosting = hostings.youtube;
let activeDownload = undefined;

//TODO: wrap all workers into a template/base class

const self = module.exports = {
    async add(link) {
        const created = await models.Video.create({
            link,
            hosting: hosting.name,
        });
        if (!activeDownload) this.next();
        return created;
    },
    async next() {
        if (activeDownload) return; //already downloading something, queue up
        const next = await models.Video.findOne({
            download_status: download_statuses.pending,
            hosting: hosting.name,
        }).lean().exec();
        if (!next) return; // no more pending videos
        const name = new UUID(4).format() + '.mp4';
        activeDownload = downloader(next.link);
        activeDownload.on('info', info => {
            console.log('Download started');
            const duration = secondsToString(info.duration);
            models.Video.findByIdAndUpdate(next._id, {
                download_status: download_statuses.downloading,
                title: info.title,
                description: info.description,
                tags: info.tags,
                duration,
                views: info.view_count,
                likes: info.like_count,
                favorites: 0,
                comments: 0,
                thumbnail: info.thumbnail,
                channel: info.uploader,
            }).exec();
        });
        activeDownload.on('end', info => {
            console.log('Download completed');
            models.Video.findByIdAndUpdate(next._id, {
                download_status: download_statuses.downloaded,
                downloaded_url: `/storage/${name}`,
            }).exec();
            activeDownload = undefined;
            this.next();
        });
        activeDownload.pipe(fs.createWriteStream(`storage/public/${name}`));
    }
};

//todo: remove/resume videos in 'downloading' state
self.next(); //try to resume queue;