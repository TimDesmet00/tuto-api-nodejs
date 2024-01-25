const express = require("express");
const {
  setPosts,
  getPosts,
  editPost,
  deletePost,
  likePost,
} = require("../controllers/post.controller");
const router = express.Router();

router.get("/", getPosts);
router.post("/", setPosts);
router.put("/:id", editPost);
router.delete("/:id", deletePost);
router.patch("/like-post/:id", likePost);

router.patch("/dislike-post/:id", (req, res) => {
  res.json({ message: `Dislike du post ${req.params.id}` });
});

module.exports = router;
