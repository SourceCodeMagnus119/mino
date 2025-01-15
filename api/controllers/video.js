const fs = require("fs");
const path = require("path");
const redis = require("redis");
const client = redis.createClient();

/**
 * @param Integrated Video Streaming and Caching.
 */
const stream = async(req, res) => {
    try {
        res.send("Stream your videos");
    } catch(err) {
        res
        .status(500)
        .json({ message: `Internal Server Error` });
        console.error(err);
    } 
};

module.exports = stream;