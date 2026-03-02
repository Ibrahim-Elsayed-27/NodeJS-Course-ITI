import Comment from "../../Database/Models/Comment.Model.js";

const viewComments = async (req, res) => {
  let decoded = req.decoded;
  let comments = await Comment.find({ user: decoded.id });
  res.json({ message: "Comments retrieved successfully", comments });
};

const createComment = async (req, res) => {
  let decoded = req.decoded;
  let postId = req.body.postId;
  let addComment = await Comment.insertOne({
    ...req.body,
    user: decoded.id,
    post: postId,
  });
  res.json({ message: "Comment created successfully", comment: addComment });
};

const updateComment = async (req, res) => {
  let decoded = req.decoded;
  let commentId = req.params.id;
  let updatedComment = await Comment.findOneAndUpdate(
    { _id: commentId, user: decoded.id },
    req.body,
    { new: true },
  );
  res.json({
    message: "Comment updated successfully",
    comment: updatedComment,
  });
};

const deleteComment = async (req, res) => {
  let decoded = req.decoded;
  let commentId = req.params.id;
  await Comment.findOneAndDelete({ _id: commentId, user: decoded.id });
  res.json({ message: "Comment deleted successfully" });
};

export { viewComments, createComment, updateComment, deleteComment };
