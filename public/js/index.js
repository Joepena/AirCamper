////Naming elements
//sky
var starSmall = document.getElementsByClassName("starSmall");
var starPointy = document.getElementsByClassName("starPointy");
var starCross = document.getElementsByClassName("starCross");

//forest
var grass = document.getElementsByClassName("grass");
var swingingTree = document.getElementsByClassName("swingingTree");

//fire
var fireLight = document.getElementsByClassName("fireLight");

var fireRight = document.getElementsByClassName("fireRight");
var fireMiddle = document.getElementsByClassName("fireMiddle");
var fireLeft = document.getElementsByClassName("fireLeft");

var fireParticle = document.getElementsByClassName("fireParticle");
var fireParticleCross1 = document.getElementsByClassName("fireParticleCross1");
var fireParticleCross2 = document.getElementsByClassName("fireParticleCross2");
var fireParticleSquare1 = document.getElementsByClassName("fireParticleSquare1");
var fireParticleSquare2 = document.getElementsByClassName("fireParticleSquare2");
var fireParticleSquare3 = document.getElementsByClassName("fireParticleSquare3");
var fireParticleSquare4 = document.getElementsByClassName("fireParticleSquare4");

var shadowTrunk1 = document.getElementsByClassName("shadowTrunk1");
var shadowTrunk2 = document.getElementsByClassName("shadowTrunk2");


//characters
var marshmallow = document.getElementsByClassName("marshmallow");

var blueArm = document.getElementsByClassName("blueArm");
var blueStick = document.getElementsByClassName("blueStick");

var redArm = document.getElementsByClassName("redArm");
var redStick = document.getElementsByClassName("redStick");

var characterEyes = document.getElementsByClassName("characterEyes");


//bear
var bearFace = document.getElementsByClassName("bearFace");

var bearBody = document.getElementsByClassName("bearBody");
var bearEyes = document.getElementsByClassName("bearEyes");
var bearNose = document.getElementsByClassName("bearNose");

var bearEars = document.getElementsByClassName("bearEars");
var bearEarLeft = document.getElementsByClassName("bearEarLeft");
var bearEarRight = document.getElementsByClassName("bearEarRight");

var bearBrows = document.getElementsByClassName("bearBrows");

var bearPaws = document.getElementsByClassName("bearPaws");
var bearPawRight = document.getElementsByClassName("bearPawRight");
var bearPawLeft = document.getElementsByClassName("bearPawLeft");



//// Animation
///Sky
var tlstarSmall = new TimelineMax();
tlstarSmall.staggerFromTo(starSmall, .5, {
  opacity:1
}, {
  opacity:0,
  repeat:-1,
  repeatDelay: 2,
  yoyo:true
}, 3.5)

var tlstarPointy = new TimelineMax();
tlstarPointy.staggerFromTo(starPointy, 2, {
  transformOrigin:"50% 50%",
  scaleY:.75,
  scaleX:.75
}, {
  scaleY:1.2,
  scaleX:1.1,
  repeat:-1,
  yoyo:true
}, 2)


var tlstarRotate = new TimelineMax({
	repeat: -1,
});
tlstarRotate.staggerTo(starCross, 30, {
	transformOrigin:"50% 50%",
	rotation: "360deg",
	ease: "linear"
}, 3)

var tlstarCross = new TimelineMax();
tlstarCross.staggerFromTo(starCross, 1, {
  transformOrigin:"50% 50%",
  scaleY:.9,
  scaleX:.9
}, {
  scaleY:1.05,
  scaleX:1.05,
  repeat:-1,
  yoyo:true
}, 3)


///Forest
//grass
var tlgrass = new TimelineMax();
tlgrass.staggerFromTo(grass, 2, {
  transformOrigin:"0% 100%",
  skewX:"10deg"
}, {
  skewX:"-10deg",
  repeat: -1,
  yoyo: true
}, 0.3);

//tree
var tlswingingTree = new TimelineMax();
tlswingingTree.staggerFromTo(swingingTree, 2, {
  transformOrigin:"0% 100%",
  skewX:"1.5deg",
}, {
  skewX:"-1.5deg",
  repeat: -1,
  yoyo: true,
}, 1);


//Fire
var tlfire = new TimelineMax();
tlfire.staggerFromTo([fireLeft, fireMiddle, fireRight], .6, {
  transformOrigin:"50% 100%",
  scaleY:1
}, {
  scaleY:1.3,
  repeat: -1,
  yoyo: true,
}, .3);

var tlfireParticles = new TimelineMax();
tlfireParticles.staggerFromTo(fireParticle, 5, {
  y:10,
  opacity:1
}, {
  y:-30,
  opacity:0,
  rotation:40,
  repeat: -1,
}, .5)

var tlfireLight = new TimelineMax();
tlfireLight.to(fireLight, 2, {
  transformOrigin: "50% 50%",
  scaleX:.5,
  scaleY:.8,
  repeat:-1,
  repeatDelay:.3,
  yoyo:true
})

var tlshadowtrunkOne = new TimelineMax();
tlshadowtrunkOne.to(shadowTrunk1, 2, {
  transformOrigin: "100% 50%",
  scaleX:.8,
  repeat:-1,
  repeatDelay:.3,
  yoyo:true
})

var tlshadowtrunk2 = new TimelineMax();
tlshadowtrunk2.to(shadowTrunk2, 2, {
  transformOrigin: "50% 0%",
  scaleY:.7,
  repeat:-1,
  repeatDelay:.3,
  yoyo:true
})


//Marshmallows
var tlblueArm = new TimelineMax();
tlblueArm.to([blueArm, blueStick], 1.5, {
  transformOrigin:"0% 0%",
  rotation:"8deg",
  repeat:-1,
  yoyo:true,
  ease: "linear"
})
var tlblueStick = new TimelineMax();
tlblueStick.to(blueStick, 1.5, {
  y:2,
  repeat:-1,
  yoyo:true,
  ease: "linear"
})

var tlredArm = new TimelineMax();
tlredArm.to([redArm, redStick], 1.5, {
  transformOrigin:"100% 0%",
  rotation:"12deg",
  repeat:-1,
  yoyo:true,
  ease: "linear"
})
var tlredStick = new TimelineMax();
tlredStick.to(redStick, 1.5, {
  y:-3,
  repeat:-1,
  yoyo:true,
  ease: "linear"
})

var tlcharacterEyes = new TimelineMax({repeat:-1});
tlcharacterEyes.to(characterEyes, .2, {opacity: 0}, 4)
tlcharacterEyes.to(characterEyes, .2, {opacity: 1})



//Bear
var tlbearAppear = new TimelineMax ({
  repeat:-1,
  repeatDelay: 10
});
tlbearAppear.staggerFromTo([bearFace, bearNose, bearEars, bearPaws, bearBrows], .7, {
  y:25, 
  scaleY:.5,
  opacity:0
}, {
  y:0, 
  scaleY:1,
  opacity:1,
  delay:0,
  ease: Back.easeOut.config(2),
}, .05);
tlbearAppear.to(bearBrows, .5, {y:-2, ease: Back.easeOut.config(2)}, 1)
tlbearAppear.to(bearBrows, .4, {y:0}, 3)
tlbearAppear.to(bearPaws, .8, {
  y:3,
  scaleY:0,
  opacity:0,
}, 5.5)
tlbearAppear.to([bearFace, bearNose, bearEars, bearBrows], .5, {
  y:30,
  scaleY:0,
}, 6)

var tlbearBlink = new TimelineMax({repeat:-1});
tlbearBlink.to(bearEyes, .2, {opacity: 0}, 4)
tlbearBlink.to(bearEyes, .2, {opacity: 1})