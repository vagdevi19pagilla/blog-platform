const router = require("express").Router();
const Comment = require("../models/Comment");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {
  const comment = new Comment({...req.body, userId: req.user.id});
  await comment.save();
  res.send(comment);
});

router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({postId: req.params.postId});
  res.json(comments);
});

module.exports = router;