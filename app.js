var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB    = require("./seeds"),
    Comment   = require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp");
seedDB();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/", function(req,res){
  res.render("landing");
});

app.get("/campgrounds",function(req,res) {
  Campground.find({},function(err,allcampgrounds){
        if (err) {
            console.log(err);
        }
        else {
          res.render("campgrounds/index", {campgrounds:allcampgrounds})
        }
  });
});


app.get("/campgrounds/new",function(req,res){
  res.render('campgrounds/new');
});

app.post("/campgrounds",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newcampground = {name: name, image: image, description: desc}
  //Create a new campground and save to Db
  Campground.create(newcampground, function(err,newlycreated){
    if (err) {
      console.log(err);
    }
    else {
      console.log(foundCampground);
      res.redirect("/campgrounds");
    }
  });

});

app.get("/campgrounds/:id",function(req,res){
  //find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err) {
      console.log(err);
    }else{
      res.render("campgrounds/show",{campground:foundCampground});
    }
  });
});
// =========================
// COMMENTS ROUTES
// ==========================
app.get("/campgrounds/:id/comments/new",function(req, res){
  //find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    }else {
      res.render("comments/new",{campground: campground});
    }
  });

});
app.post("/campgrounds/:id/comments",function(req,res){
  //look up campground by id
  Campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }else{
      Comment.create(req.body.comment,function(err,comment){
        if (err) {
          console.log(err);
        }else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/'+campground._id);
        }
      });
    }
  });
});

app.listen(3000, function () {
    console.log('YelpCamp Server has started');
});
