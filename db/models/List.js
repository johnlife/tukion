
module.exports = (Schemas, mongoose) => {
    return new mongoose.Schema({
        title: String,
        videos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }],
    });
};