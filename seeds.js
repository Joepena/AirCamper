var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
  {
    name: "Clouds Rest",
    image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",
    description: "Amazing view of plains and clouds!"
  },
  {
  name: "Granite Hill",
  image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
  description: "Great for mountain climbing and hiking!"
  },
  {
  name: "Desert Mesa",
  image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
  description: "Open and Arid"
  },
]
function seedDB(){
  //remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds!");
    //add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed,function(err,campground){
        if (err) {
          console.log(err);
        }
        else{
          console.log("added campground");
          //create a comment
          Comment.create(
          {
            text: "This place is great, but I wish there was internet",
            author: "Homer"

          },function(err,comment){
            if (err) {
              console.log(err);
            }else {
              campground.comments.push(comment);
              campground.save();
              console.log("created comment");
            }

          });
        }
      });
    });
  });



};
module.exports = seedDB;
