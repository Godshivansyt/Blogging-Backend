const Post = require("../models/Post");

//create a new blog post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const post = await Post.create({ title, content, category, tags });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: "Invalid data provided", error });
  }
};

// Update an existing blog post

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, tags } = req.body;

    const post = await Post.findByIdAndUpdate(
      id,
      { title, content, category, tags, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!post) return res.status(404).json({ message: "Post not Found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: "Invalid data Provided", error });
  }
};

// Delete an existing blog Post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single blog post
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all blog posts with optional search filter
exports.getAllPosts = async (req, res) => {
  try {
    const { term } = req.query;
    const query = term
      ? {
          $or: [
            { title: { $regex: term, $options: "i" } },
            { content: { $regex: term, $options: "i" } },
            { category: { $regex: term, $options: "i" } },
          ],
        }
      : {};

    const posts = await Post.find(query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
