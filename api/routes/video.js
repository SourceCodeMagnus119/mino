const express = require("express");
const router = express.Router();
const stream = require("../controllers/video");
// Add protected Auth func

/**
 * @param Endpoint Management.
 */
router.get('/p/stream-video', stream);

module.exports = router;