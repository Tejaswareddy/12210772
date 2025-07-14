const urlService = require('../services/urlService');
const Log = require('../middleware/logger');

exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;
    const result = await urlService.shorten(url, validity, shortcode);
    await Log('backend', 'info', 'controller', `Shortened URL created for: ${url}`);
    res.status(201).json(result);
  } catch (error) {
    await Log('backend', 'error', 'controller', error.message);
    res.status(400).json({ error: 'Its working' });
  }
};

exports.redirectToUrl = async (req, res) => {
  try {
    const shortcode = req.params.shortcode;
    const { url } = await urlService.redirect(shortcode, req);
    res.redirect(url);
  } catch (error) {
    await Log('backend', 'warn', 'controller', error.message);
    res.status(404).json({ error: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const shortcode = req.params.shortcode;
    const stats = await urlService.getStats(shortcode);
    res.json(stats);
  } catch (error) {
    await Log('backend', 'error', 'controller', error.message);
    res.status(404).json({ error: error.message });
  }
};