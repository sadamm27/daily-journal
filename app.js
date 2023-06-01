//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Rangkullah Kenangan yang Berharga, Tuangkan Impianmu, dan Ciptakan Kehidupan yang Lebih Bermakna melalui Home Daily Journal: Jurnal Harian yang Menginspirasi dan Membantu Mencapai Tujuan";
const aboutContent = "Menginspirasi dan Mempromosikan Kehidupan yang Penuh Kesadaran Melalui Home Daily Journal Daily Journal adalah tim yang berdedikasi untuk menginspirasi dan memotivasi Anda dalam mengeksplorasi kehidupan sehari-hari yang penuh makna. Kami memahami pentingnya menghargai momen kecil dan merayakan pencapaian serta pertumbuhan pribadi. Dengan Home Daily Journal, kami percaya bahwa setiap harimu memiliki potensi untuk menjadi bab yang menarik dalam perjalanan hidupmu. Melalui jurnal harian ini, kami mengundangmu untuk merenung, mencatat, dan melacak kemajuanmu";
const contactContent = "Kami di Home Daily Journal sangat ingin mendengar dari Anda. Apakah Anda memiliki pertanyaan, umpan balik, atau hanya ingin berbagi pengalaman Anda dengan menggunakan jurnal harian kami?";

const app = express();
const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent, 
    posts: posts
  });
});

app.get("/about", (req, res) => {
  res.render("about", {About: aboutContent});
});

app.get("/contact", (req, res) => {
  res.render("contact", {Contact: contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title : req.body.postTitle,
    content : req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});
app.get("/posts/:postName", (req, res)=> {
  const requestTitle = _.lowerCase(req.params.postName);

  posts.forEach((post)=>{
    let storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestTitle){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});
app.listen(3000, function() {
  ("Server started on port 3000");
});
