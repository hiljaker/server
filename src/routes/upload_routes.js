const express = require('express');
const { uploadImage } = require('../controllers/upload_controllers');
const uploader = require('../helpers/upload_file');
const router = express.Router()

const uploadImg = uploader("/images", "IMG").fields([
    { name: "image", maxCount: 3 }
])

router.post("/uploadimage", uploadImg, uploadImage)

module.exports = router