var express = require('express');
var router = express.Router();
var Category = require('../models/category');

/* GET home page. */
router.get('/', function(req, res) {
    Category.find({}).exec(function(err, categorys) {
        if (err) {
            console.log("db error in GET /categorys: " + err);
            res.render('500');
        } else {
            res.render('category/list', {title:'类别列表', categorys: categorys});
        }
    });
});
/* new category. */
router.get('/new', function(req, res) {
    res.render('category/new', {title:'类别添加'});
});

router.post('/new', function(req, res) {
    console.log(req.body);
    Category.create(req.body, function(err, category) {
        if (err) {
            console.log("db error in POST /posts: " + err);
            res.render('500');
        } else {
            req.flash('success', 'A new category was created');
            res.redirect('/category/new');
        }
    });

});

/* edit category. */
router.get('/:id', function(req, res) {
    Category.findById(req.params.id, function(err, category) {
        if (err) {
            console.log("db find error in get /category/" + req.params.id + ": " + err);
            res.render('500');
        } else if (!category) {
            res.render('404');
        } else {
            res.render('category/edit', {title:'类别修改', category: category});
        }
    });
});

router.put('/:id', function(req, res) {
    Category.findById(req.params.id, function(err, category) {
        if (err) {
            console.log("db find error in PUT /category/" + req.params.id + ": " + err);
            res.render('500');
        } else if (!category) {
            res.render('404');
        } else {
            category.name = req.body.name;
            category.description = req.body.description;

            category.save(function(err) {
                if (err) {
                    console.log("db save error in PUT /category/" + req.params.id + ": " + err);
                    res.render('500');
                } else {
                    var url = '/category/'+category.id;
                    req.flash('success', 'category updated');
                    res.redirect(url);
                }
            });
        }
    });
});

/* delete category. */
router.delete('/:id', function(req, res) {
    Category.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log("db save error in DELETE /category/" + req.params.id + ": " + err);
            res.render('500');
        } else {
            req.flash('success', 'Category deleted');
            res.redirect('/category');
        }
    });
});

module.exports = router;
