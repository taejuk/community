var mongoose = require("mongoose");
var Comment = require("./comments");
const { Schema } = mongoose;

const PostSchema = new Schema({
  author: Schema.Types.ObjectId,
  board_id: { type: Number, default: 0 },
  community: String,
  title: String,
  body: String,
  anon: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  comments: [Comment],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
