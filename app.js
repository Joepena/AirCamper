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

//Requiring Routes
var indexRoutes      = require("./routes/index"),
    commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

//seedDB(); //seeding data

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

//pass obj user to all routes
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, function () {
    console.log('YelpCamp Server has started');
});
