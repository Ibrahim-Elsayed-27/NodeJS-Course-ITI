import { postModel } from "../../Database/Models/Post.model.js";

const getPosts = async (req, res) => {
  let posts = await postModel.find();
  res.json({ message: "List Of Posts", data: posts });
};

const createPost = async (req, res) => {
  let newPost = await postModel.insertMany(req.body);
  res.status(201).json({ message: "Post Created", data: newPost });
};

const updatePost = async (req, res) => {
  let id = req.params.id;
  let updatedPost = await postModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Post Updated", data: updatedPost });
};

const deletePost = async (req, res) => {
  let id = req.params.id;
  let deletedPost = await postModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Post Deleted", data: deletedPost });
};

export { getPosts, createPost, updatePost, deletePost };
