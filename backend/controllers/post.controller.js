const PostModels = require("../models/posts.model");

module.exports.getPosts = async (req, res) => {
  const posts = await PostModels.find();
  res.status(200).json(posts);
};

module.exports.setPosts = async (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ message: "Le message est obligatoire" });
  }

  const post = await PostModels.create({
    message: req.body.message,
    author: req.body.author,
  });
  res.status(200).json(post);
};

module.exports.editPost = async (req, res) => {
  const post = await PostModels.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ message: "Le post n'existe pas" });
  }

  const updatePost = await PostModels.findByIdAndUpdate(post, req.body, {
    new: true,
  });

  res.status(200).json(updatePost);
};

module.exports.deletePost = async (req, res) => {
  const post = await PostModels.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ message: "Le post n'existe pas" });
  }

  await post.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json({ message: "Le post a été supprimé id:" + req.params.id });
};

module.exports.likePost = async (req, res) => {
  try {
    const data = await PostModels.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.userId } },
      { new: true }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.dislikePost = async (req, res) => {
  try {
    const data = await PostModels.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.userId } },
      { new: true }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(400).json(err);
  }
};
