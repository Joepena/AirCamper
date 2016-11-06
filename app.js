var express        = require("express"),
    app            = express(),
    User           = require("./models/user"),
    seedDB         = require("./seeds"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    bodyParser     = require("body-parser"),
    Comment        = require("./models/comment"),
    Campground     = require("./models/campground"),
    LocalStrategey = require("passport-local");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
//set in a config file later
  secret: "Hello world",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategey(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
//=========================
//AUTH ROUTES
//=========================

//register form
app.get("/register",function(req,res){
  res.render("register");
});

//signup logic

app.post("/register",function(req,res){
  var newUser = new User({username: req.body.username});
  User.register(newUser,req.body.password,function(err,user){
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req,req,function(){
      res.redirect("/campgrounds");
    });
  });
});

// show login form
app.get("/login",function(req,res){
  res.render("login");
});

//login logic
app.post("/login",passport.authenticate("local",
{
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}),function(req,res){
  
});

app.listen(3000, function () {
    console.log('YelpCamp Server has started');
});
