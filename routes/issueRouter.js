const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue.js')

//get all issues
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

//get issues by user id
issueRouter.get("/user", (req, res, next) => {
  Issue.find({ user: req.user._id }, (err, issues) => {
    if(err) {
    res.status(500)
    return next(err)
    }
    return res.status(200).send(issues)
  })  
})

//get issue by issue id
issueRouter.get("/:issueId", (req, res, next) => {
  Issue.findById(req.params.issueId, (err, issue) => {
    if(err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issue)
  })
})

//add new issue
issueRouter.post("/", (req, res, next) => {
  Issue.findOne({ title: req.body.title }, (err, issue) => {
    if(issue){
      res.status(403)
      return next(new Error("That title already exists"))
    }
  })
  req.body.user = req.user._id
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

//delete issue
issueRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId, user: req.user._id },
    (err, deletedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted issue: ${deletedIssue.title}`)
    }
  )
})

//update issue
issueRouter.put("/:issueId", (req, res, next) => {
  console.log(req.user._id)
  console.log(req.body.upvotes)
  Issue.findOneAndUpdate(
    { _id: req.params.issueId },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if(err){
        console.log(req.body)
        res.status(500)
        return next(err)
      }
      console.log(req.body)
      console.log('is this actually posting')
      return res.status(201).send(updatedIssue)
    }
  )
})


module.exports = issueRouter