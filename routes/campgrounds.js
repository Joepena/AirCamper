var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

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
router.post("/",middleware.isLoggedIn,function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  var newcampground = {name: name, image: image, description: desc, author: author}
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
router.get("/new",middleware.isLoggedIn,function(req,res){
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

//EDIT Campground Route
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id,function(err, foundCampground){
          res.render("campgrounds/edit",{campground:foundCampground});    
    });      
});

//UPDATE Campground Route
router.put("/:id/edit",function(req,res){
  //find and UPDATE
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
    if (err) {
      res.redirect("/campgrounds");
    }else {
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});
//DESTROY Route
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
  Campground.findByIdAndRemove(req.params.id,function(err){
    if (err) {
      res.redirect("/campgrounds");
    }else {
      res.redirect("/campgrounds");
    }
  });
});



module.exports = router;
