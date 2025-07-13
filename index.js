const express = require("express");
const app = express();
const path = require("path");

const methodOverride = require("method-override");

const { v4: uuidv4 } = require('uuid');

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride('_method'));


app.use(express.urlencoded({ extended : true}));

app.use(express.json());

let data = [
    {
        id: uuidv4(),
        username: "a",
        img: "apple.png",
        likes: 89,
        comments: 4,
        content: "I love to eat Apple"
    },
    {
        id: uuidv4(),
        username: "b",
        img: "mango.png",
        likes: 839,
        comments: 45,
        content: "I love to eat Mnango"
    },
    {
        id: uuidv4(),
        username: "c",
        img: "orange.png",
        likes: 763,
        comments: 76,
        content: "I love to eat Orange"
    }
];



app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts: data});
})

app.post("/posts", (req, res) =>{
    let {username, content, likes, comments} = req.body;
    let id = uuidv4();
    data.push({id, username, likes, comments, content});
    res.redirect("/posts");
});

app.get("/posts/new", (req, res) =>{
    res.render("form.ejs");
});




app.get("/posts/:id", (req, res) =>{
    let { id } = req.params;
    let post = data.find((d) => id === d.id);
    res.render("details.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = data.find((d) => id === d.id);
    res.render("edit.ejs", { post });
});



app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = data.find((d) => id === d.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
});


app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    data = data.filter((d) => id !== d.id);
    res.redirect("/posts");
});

app.listen(port, (req, res) => {
    console.log(`listening to port ${port}`);
});