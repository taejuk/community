var mongoose = require("mongoose");

var { Schema } = mongoose;
var recommentSchema = new Schema({
  comment_id: Schema.Types.ObjectId,
  nickname: String,
  text: String,
  anon: { type: Boolean, default: false },
});
var Comment = new Schema({
  board_id: Number,
  text: String,
  user_id: String,
  is_deleted: { type: Boolean, default: false },
  create_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  recomment: [recommentSchema],
  anon: { type: Boolean, default: false },
});

module.exports = Comment;
