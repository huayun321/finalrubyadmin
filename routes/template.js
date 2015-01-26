var express = require('express');
var router = express.Router();
var Template = require('../models/template');
var gridform = require('gridform');
var mongoose = require('mongoose');
var Grid = require('gridform').gridfsStream;
var gm = require('gm');


/* GET home page. */
router.get('/', function(req, res) {
    Template.find({}).exec(function(err, templates) {
        if (err) {
            console.log("db error in GET /templates: " + err);
            res.render('500');
        } else {
            res.render('template/list', {title:'模板列表', templates: templates});
        }
    });
});
/* new category. */
router.get('/new', function(req, res) {
    res.render('template/index', {title:'模板添加'});
});

router.post('/new', function(req, res) {
    console.dir(req.body.obj);
    //req.body.obj = JSON.stringify(req.body.obj);
    Template.create(req.body, function(err, template) {
        if (err) {
            console.log("db error in template /posts: " + err);
            res.render('500');
        } else {
            req.flash('success', 'A new template was created');
            res.redirect('/template');
        }
    });

});

/* edit category. */
router.get('/:id', function(req, res) {
    Material.findById(req.params.id, function(err, category) {
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
    Material.findById(req.params.id, function(err, category) {
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
    Template.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log("db save error in DELETE /template/" + req.params.id + ": " + err);
            res.render('500');
        } else {
            req.flash('success', 'template deleted');
            res.redirect('/template');
        }
    });
});

module.exports = router;
