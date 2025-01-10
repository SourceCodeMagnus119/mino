const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    video: {
        controls: {
            play: Boolean, 
            skip, 
            settings: {
                quality: {
                    enum: ["144p", "240p", "360p", "480p", "720p", "720p60", "1080p60", "4k"],
                },
                playbackSpeed: {
                    enum: ["0.25", "0.5", "0.75", "normal", "1.25", "1.5", "1.75", "2"],
                },
            }, 
            subtitles: {
                type: String,
            },
            theatre: Boolean, 
            fullscreen: Boolean,
        }
    },
    creator: {
        type: String,
        required: true,
    },
    subcribe: {
        enum: ["like", "dislike"],
    },
    share: {
        enum: ["email", "pinterest", "x", "facebook", "instagram"],
    },
    description: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);