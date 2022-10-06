const express = require('express');
const fs = require('fs');
const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    let icons = fs.readdirSync('./storage/icons', {withFileTypes: true}).filter(item => !item.isDirectory());
    let avatars = fs.readdirSync('./storage/avatars', {withFileTypes: true}).filter(item => !item.isDirectory());
    res.render('index', {
        title: 'Placeholder',
        icons: icons,
        avatars: avatars,
    });
});

module.exports = router;
