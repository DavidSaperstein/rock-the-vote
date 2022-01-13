const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  issue: {
    type: Schema.Types.ObjectId,
    ref: "Issue",
    required: true
  },
  username: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Comment", commentSchema)