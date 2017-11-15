var express = require('express');
var router = express.Router();
var Message = require('../models/message');

//the path is just / since in the end it will be /messages/
//every route set up here invisibly has messages before the /
router.post('/', function(req, res, next){
  var message = new Message({
    content: req.body.content
  });
  message.save(function(err, result){
    if(err) {
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'Saved Message',
      obj: result
    });
  })
});

router.get('/', function(req, res, next){
  Message.find()
          .exec(function(err, messages){
            if(err) {
              return res.status(500).json({
                title: 'An Error Occurred',
                error: err
              });
            }
            res.status(200).json({
              message: 'Success',
              obj: messages
            });
          });
});

router.patch('/:id', function(req, res, next){
  Message.findById(req.params.id, function(err, message) {
    if(err) {
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    if(!message) {
      return res.status(500).json({
        title: 'No Message Found',
        error: {message: 'Message not Found'}
      });
    }
    message.content = req.body.content;
    message.save(function(err, result){
      if(err) {
        return res.status(500).json({
          title: 'An Error Occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated Message',
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next){
  Message.findById(req.params.id, function(err, message) {
    if(err) {
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    if(!message) {
      return res.status(500).json({
        title: 'No Message Found',
        error: {message: 'Message not Found'}
      });
    }
    message.remove(function(err, result){
      if(err) {
        return res.status(500).json({
          title: 'An Error Occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted Message',
        obj: result
      });
    });
  });
});

module.exports = router;
