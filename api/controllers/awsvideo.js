const fs = require("fs");
const path = require("path");
const redis = require("redis");
const client = redis.createClient();
const multer = require("multer");
const multerS3 = require("multer-s3");
const Video = require("../models/video");
const s3 = require("../config/aws-config");

/**
 * @param CRUD operations && Video Streaming and Caching.
 */
const upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      acl: "public-read",
      key: function (req, file, cb) {
        cb(null, `videos/${Date.now()}_${file.originalname}`);
      },
    }),
});
  
const uploadVideo = async (req, res) => {
    try {
      const fileUrl = req.file.location;
      const { creator, description } = req.body;
  
      const newVideo = new Video({
        video: { fileUrl },
        creator,
        description,
      });
  
      const savedVideo = await newVideo.save();
      res
      .status(201)
      .json({ message: "Video uploaded successfully", data: savedVideo });
    } catch (err) {
      res
      .status(500)
      .json({ message: "Error uploading video", error: err.message });
    }
};

const getVideos = async (req, res) => {
    try {
      const videos = await Video.find();
      res
      .status(200)
      .json({ message: "Videos retrieved successfully", data: videos });
    } catch (err) {
      res
      .status(500)
      .json({ message: "Error retrieving videos", error: err.message });
    }
};

const streamVideo = async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);
      if (!video) {
        return res
        .status(404)
        .json({ message: "Video not found" });
      }
  
      const videoUrl = video.video.fileUrl;
      res.redirect(videoUrl);
    } catch (err) {
      res
      .status(500)
      .json({ message: "Error streaming video", error: err.message });
    }
};

const updateVideo = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const updatedVideo = await Video.findByIdAndUpdate(id, updates, { new: true });
      res
      .status(200)
      .json({ message: "Video updated successfully", data: updatedVideo });
    } catch (err) {
      res
      .status(500)
      .json({ message: "Error updating video", error: err.message });
    }
};

const deleteVideo = async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);
  
      if (!video) {
        return res
        .status(404)
        .json({ message: "Video not found" });
      }
  
      const videoKey = video.video.fileUrl.split("/").slice(-2).join("/");
      await s3.deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: videoKey,
      }).promise();
  
      await video.remove();
      res
      .status(200)
      .json({ message: "Video deleted successfully" });
    } catch (err) {
      res
      .status(500)
      .json({ message: "Error deleting video", error: err.message });
    }
};

module.exports = { uploadVideo, getVideos, streamVideo, updateVideo, deleteVideo };