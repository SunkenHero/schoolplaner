var express = require('express');
var router = express.Router();
const db = require('../db.js');

//all routes in this file are prefixed with /api/homework

router.get('/all', async (req, res) => {
    db.getAllHomework((err, result)=>{
        if(err) {
            res.json({message: "Error"})
        } else {
            res.json(result)
        }
    })
});

router.get('/unfinished', async (req, res) => {
    db.getUnfinishedHomework((err, result)=>{
        if(err) {
            res.json({message: "Error"})
        } else {
            res.json(result)
        }
    })
});

router.get('/:id', async (req, res) => {
    db.getHomework(req, (err, result)=>{
        if (err) {
            res.json({message: "Error"})
        } else {
            res.json(result)
        }
        });
});

router.get('/:year/:month/:day', async (req, res) => {
    db.getHomeworkByDate(req, (err, result)=>{
        if (err) {
            res.json({message: "Error"})
        } else {
            res.json(result)
        }
        });
});

router.get('/:year/:month/:day/unfinished', async (req, res) => {
    db.getHomeworkByDateUnFinished(req, (err, result)=>{
        if (err) {
            res.json({message: "Error"})
        } else {
            res.json(result)
        }
        });
});


router.post('/', async (req, res) => {
    db.createHomework(req, (err, result)=>{
        if (err) {
            res.json({message: "Error"})
        } else {
            res.json({message: "Success"})
        }
    });
});

router.put('/:id/', async (req, res) => {
    db.updateHomework(req, (err, result)=>{
        if (err) {
            res.json({message: "Error"})
        } else {
            res.json({message: "Success"})
        }
    });
});

router.patch('/:id/', async (req, res) => {
    db.checkHomework(req, (err, result)=>{
        if (err) {
            res.json({message: "Error"})
        } else {
            res.json({message: "Success"})
        }
    });
});

router.delete('/:id/', async (req, res) => {
    db.deleteHomework(req, (err, result)=>{
        if (err) {
            res.json({message: "Error"})
        } else {
            res.json({message: "Success"})
        }
    });
});

module.exports = router;