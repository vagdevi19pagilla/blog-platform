const router = require("express").Router();
const Post = require("../models/Post");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {
  const post = new Post({...req.body, userId: req.user.id});
  await post.save();
  res.send(post);
});

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.delete("/:id", auth, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;