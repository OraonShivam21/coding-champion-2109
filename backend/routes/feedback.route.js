const express = require("express");
const FeedbackModel = require("../models/FeedbackModel");
const { auth } = require("../middlewares/auth.middleware");

const feedbackRoute = express.Router();

feedbackRoute.get("/", async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find();
    if (feedbacks.length === 0) throw "No feedbacks found";
    res.statu(200).json({ feedbacks });
  } catch (error) {
    res.status(400).json({ error });
  }
});

feedbackRoute.post("/add", auth, async (req, res) => {
  const payload = req.body;
  try {
    const feedback = new FeedbackModel(payload);
    await feedback.save();
    res.status(201).json({ msg: "Your feedback has been created" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = {
  feedbackRoute,
};