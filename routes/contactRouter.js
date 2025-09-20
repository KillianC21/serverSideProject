var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', (req, res) => {
    res.render('contact.ejs', { title: 'Conatct Us' });
});

module.exports = router;