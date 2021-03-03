var express = require("express");
var router = express.Router();
const Joi = require("@hapi/joi");

var StudyGroup = require("../models/studygroup");

router.route("/studygroup").get(async (req, res) => {
  if (!req.user) {
    res.require("/login");
    return;
  }
  var studygroups = await StudyGroup.find({});

  res.render("studygroupList", { studygroup: studygroups });
  return;
});

router.route("/mystudygroup").get(async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  var mystudygroup = await StudyGroup.find({ members: { $all: [req.user] } });

  res.render("mystudygroupList", { studygroup: mystudygroup });
  return;
});

router.route("/createstudygroup").get((req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  res.render("studygroup", { error: "" });
});

router.route("/createstudygroup").post(async (req, res) => {
  const { name, goal_hour, recruitment, notice } = req.body;
  var schema = Joi.object().keys({
    name: Joi.string().required(),
    goal_hour: Joi.number().required(),
    recruitment: Joi.number().required(),
  });
  const result = schema.validate({
    name: name,
    goal_hour: goal_hour,
    recruitment: recruitment,
  });
  if (result.error) {
    res.render("studygroup", { error: "내용을 입력해주세요" });
    return;
  }
  var studyGroup = new StudyGroup({
    name: name,
    goal_hour: goal_hour,
    recruitment: recruitment,
    notice: notice,
    leader: req.user,
    members: [req.user],
  });
  await studyGroup.save();
  res.redirect("/mystudygroup");
});

router.route("/joinstudygroup/:id").get(async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  var group_id = req.params.id;
  await StudyGroup.updateOne(
    { _id: group_id },
    { $push: { members: req.user } }
  );
  res.redirect("/mystudygroup");
  return;
});

module.exports = router;
