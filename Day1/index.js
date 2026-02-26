const http = require("http");
const fs = require("fs");
let posts = [
  { id: 1, content: "Post 1" },
  { id: 2, content: "Post 2" },
  { id: 3, content: "Post 3" },
];
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end("welcome");
  } else if (req.url == "/posts" && req.method == "GET") {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(posts));
  } else if (req.url == "/posts" && req.method == "POST") {
    req.on("data", (chunk) => {
      const newPost = JSON.parse(chunk);
      let foundPost = posts.find((element) => element.id == newPost.id);
      if (foundPost) {
        res.statusCode = 400;
        res.end("Post already exists");
      } else {
        if (!validatePost(newPost)) {
          console.log(newPost);
          res.statusCode = 400;
          res.end("Invalid post data");
        } else {
          posts.push(newPost);
          res.statusCode = 200;
          res.end("post created");
        }
      }
    });
  } else if (req.url == "/posts" && req.method == "PUT") {
    req.on("data", (chunk) => {
      let updatePost = JSON.parse(chunk);
      let foundPost = posts.find((element) => element.id == updatePost.id);
      if (foundPost) {
        if (!validatePost(updatePost)) {
          res.statusCode = 400;
          res.end("Invalid post data");
        } else {
          foundPost.content = updatePost.content;
          foundPost.id = updatePost.id;
          res.statusCode = 200;
          res.end("post updated");
        }
      } else {
        res.statusCode = 404;
        res.end("post not found");
      }
    });
  } else if (req.url == "/posts" && req.method == "DELETE") {
    req.on("data", (chunk) => {
      let deletePost = JSON.parse(chunk);
      posts = posts.filter((element) => element.id != deletePost.id);
      res.statusCode = 200;
      res.end("post deleted");
    });
  } else if (req.url.startsWith("/posts/") && req.method == "GET") {
    const id = parseInt(req.url.split("/")[2]);
    let foundPost = posts.find((element) => element.id == id);
    if (foundPost) {
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify(foundPost));
    } else {
      res.statusCode = 404;
      res.end("post not found");
    }
  }
  fs.writeFileSync("posts.json", JSON.stringify(posts));
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function validatePost(post) {
  //console.log(typeof post.content !== "string" || post.content.trim() === "");
  if (typeof post.content !== "string" || post.content.trim() === "") {
    return false;
  }
  return true;
}
