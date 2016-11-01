var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

app.get("/", function(req,res){
  res.render("landing");
});

app.get("/campgrounds",function(req,res) {
  Campground.find({},function(err,allcampgrounds){
        if (err) {
            console.log(err);
        }
        else {
          res.render("campgrounds", {campgrounds:allcampgrounds})
        }
  });
});


app.get("/campgrounds/new",function(req,res){
  res.render('new.ejs');
});

app.post("/campgrounds",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var newcampground = {name: name, image: image}
  //Create a new campground and save to Db
  Campground.create(newcampground, function(err,newlycreated){
    if (err) {
      console.log(err);
    }
    else {
      res.redirect("/campgrounds");
    }
  });

});

app.listen(3000, function () {
    console.log('YelpCamp Server has started');
});
