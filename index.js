import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;
const posts = [];

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts, pageTitle: "Home" });
});

app.get("/create-post", (req, res) => {
  res.render("editor.ejs", { post: null, pageTitle: "Create" });
});

app.get("/edit-post/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);
  res.render("editor.ejs", { post, pageTitle: "Edit" });
});

app.put("/edit-post/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.title = req.body.title;
    post.auther = req.body.auther;
    post.content = req.body.content;
  }
  res.redirect("/");
});

app.post("/create-post", (req, res) => {
  const post = {
    id: Date.now(),
    title: req.body.title,
    auther: req.body.auther,
    content: req.body.content,
    date: new Date(),
  };

  posts.push(post);
  res.redirect("/");
});

app.put("/user/angela", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/angela", (req, res) => {
  res.sendStatus(200);
});

app.delete("/delete-post/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((post) => post.id === id);

  if (index !== -1) {
    posts.splice(index, 1);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
