var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('category/list', {title:'类别列表', categorys: null});
});
/* new category. */
router.get('/new', function(req, res) {
    res.render('category/new', {title:'类别添加'});
});

router.post('/new', function(req, res) {
    res.status(404).send('create category')
});

/* edit category. */
router.get('/:id', function(req, res) {
    res.status(404).send('edit category')
});

router.put('/:id', function(req, res) {
    res.status(404).send('edit category')
});

/* delete category. */
router.delete('/:id', function(req, res) {
    res.status(404).send('delete category')
});

module.exports = router;
