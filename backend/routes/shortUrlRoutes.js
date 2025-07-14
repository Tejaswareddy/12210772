const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/shorturls', urlController.createShortUrl);
router.get('/shorturls/:shortcode', urlController.getStats);
router.get('/:shortcode', urlController.redirectToUrl);

module.exports = router;