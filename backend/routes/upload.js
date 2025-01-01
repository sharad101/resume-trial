


const express = require('express');
const multer = require('multer');
const { handleResumeUpload } = require('../controllers/uploadController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Define the route and use the controller function
router.post('/', upload.single('resume'), handleResumeUpload);

module.exports = router;
