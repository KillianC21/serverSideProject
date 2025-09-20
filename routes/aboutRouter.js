var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', (req, res) => {
    res.render('about.ejs', { title: 'About Us' });
});

module.exports = router;

