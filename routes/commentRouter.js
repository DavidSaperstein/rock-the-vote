const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment.js')

//get comments by issue id
commentRouter.get("/:issueId", (req, res, next) => {
  Comment.find({ issue: req.params.issueId }, (err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})

//add new comment
commentRouter.post("/:issueId", (req, res, next) => {
  req.body.user = req.user._id
  req.body.issue = req.params.issueId
  const newComment = new Comment(req.body)
  newComment.save((err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
})

//delete comment
commentRouter.delete("/:commentId", (req, res, next) => {
  Comment.findOneAndDelete(
    { _id: req.params.commentId, user: req.user._id },
    (err, deletedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send('Successfully deleted comment')
    }
  )
})

//update comment
commentRouter.put("/:commentId", (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.commentId, user: req.user._id },
    (err, updatedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedComment)
    }
  )
})

module.exports = commentRouter