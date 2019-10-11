module.exports = {
    youtube: {
        name: 'youtube',
        url_pattern: /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^?&"'>]+)/
    },
    vimeo: {
        name: 'vimeo',
        url_pattern: /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/
    }
};