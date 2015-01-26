var express = require('express');
var router = express.Router();
var Material = require('../models/material');
var gridform = require('gridform');
var mongoose = require('mongoose');
var Grid = require('gridform').gridfsStream;
var gm = require('gm');


/* GET home page. */
router.get('/', function(req, res) {
    Material.find({}).exec(function(err, materials) {
        if (err) {
            console.log("db error in GET /Material: " + err);
            res.render('500');
        } else {
            res.render('material/list', {title:'素材列表', materials: materials});
        }
    });
});
/* new category. */
router.get('/new', function(req, res) {
    res.render('material/new', {title:'素材添加'});
});

router.post('/new', function(req, res) {
    var form = gridform();

    form.on('progress', function(bytesReceived, bytesExpected) {
        console.log("======form progress" + bytesReceived + "====" + bytesExpected);
    });
    form.on('error', function(err) {
        console.log("======form err" + err);
    });
    // optionally store per-file metadata
    form.on('fileBegin', function (name, file) {

        file.metadata = 'so meta'
    })

    // parse normally
    form.parse(req, function (err, fields, files) {
        if(err) {
            console.dir(err);
            //todo handle err
        }

        var file = files.upload;

        var gfs = Grid(mongoose.connection.db, mongoose.mongo);
        // passing a stream
        var readstream = gfs.createReadStream({
            _id: file.id
        });

        var wid = mongoose.Types.ObjectId();
   console.log("=============wid========" + wid);
        var writestream = gfs.createWriteStream({
            _id: wid.toString(),
            mode: 'w',
            filename: 'thumbnail' + file.id + '.png',
            content_type: 'image/png'

        });
        //
        gm(readstream)
            .resize('200', '200')
            .stream('png')
            .pipe(writestream);


        var m = new Material({
            imgId: file.id,
            thumbnailId: wid
        });
        //
        m.save(function(err) {
            if(err) {
                console.log(err);
                return;
            }
            req.flash('success', 'material added');
            res.redirect('/material');

        })

        // use files and fields as you do today
        //var file = files.upload;
        //
        //file.name // the uploaded file name
        //file.type // file type per [mime](https://github.com/bentomas/node-mime)
        //file.size // uploaded file size (file length in GridFS) named "size" for compatibility
        //file.path // same as file.name. included for compatibility
        //file.lastModified // included for compatibility
        //
        //// files contain additional gridfs info
        //file.root // the root of the files collection used in MongoDB ('fs' here means the full collection in mongo is named 'fs.files')
        //file.id   // the ObjectId for this file
        //console.log('form.parse:==' + files);
        //console.dir(files);

    });


    //Material.create(req.body, function(err, category) {
    //    if (err) {
    //        console.log("db error in POST /posts: " + err);
    //        res.render('500');
    //    } else {
    //        req.flash('success', 'A new category was created');
    //        res.redirect('/category/new');
    //    }
    //});

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
    Material.findByIdAndRemove(req.params.id, function(err) {
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
