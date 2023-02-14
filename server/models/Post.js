const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  postText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
      trim: true
  },
  postAuthor: {
      type: String,
      required: true,
      trim: true,
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
  },
  comments: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Comment',
      },
  ],
//   recipes: [
//       {
//           type: Schema.Types.ObjectId,
//           ref: 'Recipe',
//       },
//   ]
});

const Post = model('Post', postSchema);

module.exports = Post;
