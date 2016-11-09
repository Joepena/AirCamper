var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//Index route
router.get("/",function(req,res) {
  Campground.find({},function(err,allcampgrounds){
        if (err) {
            console.log(err);
        }
        else {
          res.render("campgrounds/index", {campgrounds:allcampgrounds})
        }
  });
});

//Create route
router.post("/",function(req,res){
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
  
      res.redirect("/campgrounds");
    }
  });

});

//New route
router.get("/new",function(req,res){
  res.render('campgrounds/new');
});

//Show route
router.get("/:id",function(req,res){
  //find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err) {
      console.log(err);
    }else{
      res.render("campgrounds/show",{campground:foundCampground});
    }
  });
});

module.exports = router;
