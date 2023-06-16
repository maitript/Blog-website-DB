//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Welcome to our vibrant digital haven, where inspiration meets innovation and words come alive.Step into a world of captivating stories, thought-provoking ideas, and the beauty of language on our blog.Join us on a journey of exploration and discovery as we delve into the depths of knowledge and share our insights with you.Experience the power of words as we navigate the realms of literature, art, technology, and everything in between.Escape into a realm of creativity, where each blog post unveils a tapestry of imagination and sparks new conversations.Discover a sanctuary for intellect and imagination, where our blog serves as a gateway to endless possibilities.Embrace the synergy of information and entertainment as we curate a collection of captivating articles just for you.Join our community of avid readers and passionate thinkers, and embark on a quest for knowledge that knows no boundaries."
const aboutContent = "We are passionate about creating a platform where ideas flourish and minds ignite. Our mission is to provide a virtual sanctuary for readers, thinkers, and dreamers alike, fostering a community built on curiosity, exploration, and intellectual growth.With a diverse team of writers and contributors, we strive to curate an eclectic mix of thought-provoking articles, captivating stories, and insightful perspectives. From the realms of literature, science, art, technology, and beyond, we aim to traverse the boundaries of knowledge, always seeking to learn, share, and inspire.Our blog is more than just a collection of words on a screen; it's a tapestry of imagination, woven by individuals who believe in the transformative power of ideas. We invite you to join us on this exhilarating journey of discovery, where each click is an opportunity to expand your horizons and engage in meaningful conversations.Whether you're seeking intellectual stimulation, literary escapades, or simply a moment of respite from the bustling world. Our dedication to quality, authenticity, and the pursuit of knowledge fuels every article we publish, ensuring that you'll find content that resonates with your interests and kindles your curiosity.We value the vibrant tapestry of our community, and we encourage you to actively participate, share your thoughts, and engage in discussions. Together, let's embark on a collective exploration of ideas, fostering an environment where diverse perspectives thrive and new connections are forged.Thank you for being a part of the [Blog Name] family. Join us as we ignite passions, inspire minds, and embark on a continuous quest for knowledge, understanding, and personal growth.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);    //collection of the blogDB


app.get("/", function(req,res)
{
  Post.find({}, function(err, posts){
  res.render("home",{startingContent:homeStartingContent,
  posts: posts
});
});

});

app.get("/posts/:postId", function(req,res){
  const requestedPostId =  req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err,post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});






  //
  //
  // posts.forEach(function(post){
  //   const storedTitle =  _.lowerCase(post.title);
  //
  //   if (storedTitle === requestedTitle){
  //     res.render("post",{title: req.params.postName, content: post.content});



app.get("/about",function(req,res){
  res.render("about",{AboutContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{ContactContent:contactContent});
});


app.get("/compose",function(req,res){
  res.render("compose");
});


app.post("/compose",function(req,res){

  const post = new Post({
    title : req.body.postTitle,
    content : req.body.postBody
  });

  post.save(function(err){
    if(!err){
       res.redirect("/");
    }
  });



});





app.listen(4000, function() {
  console.log("Server started on port 4000");
});
