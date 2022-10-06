const express = require('express');
const fs = require('fs');
const {createCanvas, loadImage} = require('canvas');
const router = express.Router();

router.get('', function (req, res, next) {
    let width = parseInt(req.query.width) || 420;
    let height = parseInt(req.query.height) || 320;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    context.fillStyle = `#${req.query.bgColor || '01be84'}`;
    context.fillRect(0, 0, width, height);
    context.font = `bold ${req.query.fontSize || '25'}pt Tahoma`;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillStyle = `#${req.query.textColor || 'ffffff'}`;
    context.fillText( req.query.text || 'Placeholder', (width / 2), (height / 2));
    context.fillStyle = `#${req.query.textColor || 'ffffff'}`;
    context.font = '400 18px Tahoma';
    context.fillText('placeholder.tatwerat.com', width - context.measureText('placeholder.tatwerat.com').width + 85, height - 20);
    const imgBuffer = canvas.toBuffer('image/png');
    res.setHeader('Content-Type', 'image/png');
    res.send(imgBuffer);
});

module.exports = router;
