const { Schema, model } = require('mongoose');

// Create a new schema for post
const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = model('Post', postSchema);