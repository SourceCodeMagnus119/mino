const express = require("express");
const router = express.Router();
const {
    uploadVideo,
    getVideos, 
    streamVideo, 
    updateVideo, 
    deleteVideo
} = require("../controllers/awsvideo");
// Add protected Auth func

const upload = multer({ storage: multer.memoryStorage() });

/**
 * @param Endpoint Management.
 */
router.post("/p/upload", upload.single("video"), uploadVideo);
router.get("/", getVideos);
router.get("/:id", streamVideo);
router.put("/p/:id", updateVideo);
router.delete("/p/:id", deleteVideo);

module.exports = router;