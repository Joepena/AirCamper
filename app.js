var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5136/5391759757_dd33e4ecc8.jpg"},
  {name: "Granite Hill", image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3069/2942421645_38b206298a.jpg"}
];

app.get("/", function(req,res){
  res.render("landing");
});

app.get("/campgrounds",function(req,res) {

  res.render("campgrounds",{campgrounds: campgrounds});
});

app.get("/campgrounds/new",function(req,res){
  res.render('new.ejs');
});

app.post("/campgrounds",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var newcampground = {name: name, image: image}
  campgrounds.push(newcampground);
  res.redirect("/campgrounds");

});

app.listen(3000, function () {
    console.log('YelpCamp Server has started');
});