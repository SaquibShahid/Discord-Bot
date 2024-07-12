const express = require('express');
const { redirectUrl } = require('../slash.command.helpers/url.shortner');
const router = express.Router();

router.get("/:shortId" , redirectUrl);

module.exports = router;