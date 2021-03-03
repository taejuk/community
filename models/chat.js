var mongoose = require("mongoose");
const { Schema } = mongoose;

var chatSchema = new Schema({
  type: { type: String, enum: ["study", "individual"] },
  message: [
    { id: String, text: String, send_at: { type: Date, default: Date.now() } },
  ],
  room_id: String,
});

var Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
