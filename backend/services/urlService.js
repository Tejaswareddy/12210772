const { nanoid } = require('nanoid');
const dayjs = require('dayjs');
const urlModel = require('../models/urlModel');
const Log = require('../middleware/logger');

exports.shorten = async (url, validity = 30, shortcode) => {
  if (!url || !url.startsWith('http')) throw new Error('Invalid URL');

  let code = shortcode || nanoid(6);
  if (urlModel[code]) throw new Error('Shortcode already in use');

  const now = new Date();
  const expiry = new Date(now.getTime() + validity * 60000);

  urlModel[code] = {
    originalUrl: url,
    createdAt: now,
    expiry,
    clicks: []
  };

  return {
    shortLink: `http://localhost:5000/${code}`,
    expiry: expiry.toISOString()
  };
};

exports.redirect = async (shortcode, req) => {
  const record = urlModel[shortcode];
  if (!record) throw new Error('Shortcode not found');
  if (new Date() > record.expiry) throw new Error('Link expired');

  const click = {
    time: new Date(),
    referrer: req.get('Referrer') || 'direct',
    location: req.ip
  };

  record.clicks.push(click);
  await Log('backend', 'info', 'service', `Redirected click for ${shortcode}`);

  return { url: record.originalUrl };
};

exports.getStats = async (shortcode) => {
  const record = urlModel[shortcode];
  if (!record) throw new Error('Shortcode not found');

  return {
    originalUrl: record.originalUrl,
    createdAt: record.createdAt,
    expiry: record.expiry,
    totalClicks: record.clicks.length,
    clickDetails: record.clicks
  };
};
