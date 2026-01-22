import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

let Post = [];

app.get("/", (req, res) => {
  res.render("index", { Post });
});

app.get("/create", (req, res) => {
  res.render("create");
});
app.post("/create", (req, res) => {
  const newPost = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
  };

  Post.push(newPost);
  res.redirect("/");
});

app.get("/post/:id", (req, res) => {
  const post = Post.find((p) => p.id == req.params.id);
  if (!post) {
    return res.redirect("/");
  }
  res.render("post", { post });
});

app.get("/edit/:id", (req, res) => {
  const post = Post.find((p) => p.id == req.params.id);
  if (!post) {
    return res.redirect("/");
  }
  res.render("edit", { post });
});

app.post("/edit/:id", (req, res) => {
  const post = Post.find((p) => p.id == req.params.id);

  if (!post) {
    return res.redirect("/");
  }

  post.title = req.body.title;
  post.author = req.body.author;
  post.content = req.body.content;

  // Redirect to updated post
  res.redirect(`/post/${post.id}`);
});

app.post("/delete/:id", (req, res) => {
  Post = Post.filter((p) => p.id != req.params.id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
