const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
  },
  dateAdded: {
    type: String,
    required: true
  },
  upvotes: {
    type: Array,
  },
  downvotes: {
    type: Array,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  score: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model("Issue", issueSchema)