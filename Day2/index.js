import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

let comments = [
  { id: 1, author: "ahmed", body: "hello" },
  { id: 2, author: "mohamed", body: "hi" },
  { id: 3, author: "ali", body: "welcome" },
];

app.get("/home", (req, res) => {
  const filePath = fileURLToPath(import.meta.url);
  const dirPath = path.dirname(filePath);

  res.sendFile(path.join(dirPath, "index.html"));
});

app.get("/comments", (req, res) => {
  res.json(comments);
});

app.post("/comments", (req, res) => {
  if (!validateAuthor(req.body.author)) {
    return res.status(400).send("Invalid author");
  }
  if (!validateBody(req.body.body)) {
    return res.status(400).send("Invalid body");
  }
  req.body.id = comments[comments.length - 1].id + 1;
  comments.push(req.body);
  res.status(201).json(req.body, "comment added");
});

app.put("/comments/:id", (req, res) => {
  const id = req.params.id;
  const foundedComment = comments.find((comment) => comment.id == id);
  if (foundedComment) {
    if (!validateAuthor(req.body.author)) {
      return res.status(400).send("Invalid author");
    }
    if (!validateBody(req.body.body)) {
      return res.status(400).send("Invalid body");
    }
    foundedComment.author = req.body.author;
    foundedComment.body = req.body.body;
    res.status(200).json(foundedComment, "Comment Updated");
  } else {
    res.status(404).send("comment not found");
  }
});

app.delete("/comments/:id", (req, res) => {
  const id = req.params.id;
  const index = comments.findIndex((comment) => comment.id == id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(200).send("Comment deleted");
  } else {
    res.status(404).send("comment not found");
  }
});

app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  const foundedComment = comments.find((comment) => comment.id == id);
  if (foundedComment) {
    res.status(200).json(foundedComment);
  } else {
    res.status(404).send("comment not found");
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

function validateAuthor(author) {
  if (!author || author.trim() === "") {
    return false;
  }
  return true;
}

function validateBody(body) {
  if (!body || body.trim() === "") {
    return false;
  }
  return true;
}
