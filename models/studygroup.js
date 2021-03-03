var mongoose = require("mongoose");
const { Schema } = mongoose;

var studyGroupSchema = new Schema({
  name: { type: String },
  goal_hour: { type: Number },
  recruitment: { type: Number },
  password: { type: Number },
  notice: { type: String },
  leader: { type: Schema.Types.ObjectId },
  members: [Schema.Types.ObjectId],
});

var StudyGroup = mongoose.model("StudyGroup", studyGroupSchema);

module.exports = StudyGroup;
