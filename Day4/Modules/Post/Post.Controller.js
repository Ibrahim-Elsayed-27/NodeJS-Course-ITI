import Post from "../../Database/Models/Post.Model.js";

const viewPosts = async (req, res) => {
  let decoded = req.decoded;
  let posts = await Post.find({ userId: decoded.id });

  res.json({ message: "Posts retrieved successfully", posts });
};

const createPost = async (req, res) => {
  let decoded = req.decoded;
  let addPost = await Post.insertOne({ ...req.body, userId: decoded.id });
  res.json({ message: "Post created successfully", post: addPost });
};

const updatePost = async (req, res) => {
  let decoded = req.decoded;
  let postId = req.params.id;
  let updatedPost = await Post.findOneAndUpdate(
    { _id: postId, userId: decoded.id },
    req.body,
    { new: true },
  );
  res.json({ message: "Post updated successfully", post: updatedPost });
};

const deletePost = async (req, res) => {
  let decoded = req.decoded;
  let postId = req.params.id;
  await Post.findOneAndDelete({ _id: postId, userId: decoded.id });
  res.json({ message: "Post deleted successfully" });
};

export { viewPosts, createPost, updatePost, deletePost };
