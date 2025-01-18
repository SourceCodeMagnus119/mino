const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    video: {
      fileUrl: {
        type: String,
        required: true,
      },
      controls: {
        play: { type: Boolean, default: false },
        skip: { type: Boolean, default: false },
        settings: {
          quality: {
            type: [String],
            enum: ["144p", "240p", "360p", "480p", "720p", "720p60", "1080p60", "4k"],
            default: ["720p"],
          },
          playbackSpeed: {
            type: [String],
            enum: ["0.25", "0.5", "0.75", "normal", "1.25", "1.5", "1.75", "2"],
            default: ["normal"],
          },
        },
        subtitles: {
          type: String,
        },
        theatre: { type: Boolean, default: false },
        fullscreen: { type: Boolean, default: false },
      },
    },
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 266,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscribe: {
      type: String,
      enum: ["like", "dislike"],
    },
    share: {
      type: String,
      enum: ["email", "pinterest", "x", "facebook", "instagram"],
    },
    description: {
      type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);