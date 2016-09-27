/* jshint esversion:6 */

// ToDo
// increase speed at 5, 9 & 15
// set time limit on responce

(function() { //

const simon = {
  on: false,
  start: false,
  simon: false,
  player: false,
  strict: false
};


let mainCounter= 0; // mainCounter will log the turns

//window.AudioContext = window.AudioContext;

// Create a new instance of AudioContext
// for the game sounds
let ctx = new AudioContext(),
  currentOsc = null,
  scale = {
    green: 415.305,
    red: 311.127,
    blue: 207.652,
    yellow: 247.942,
    alert: 42
  };

function startWave(color) {
let osc = ctx.createOscillator();
osc.frequency.value = scale[color];
osc.type = 'square';
osc.start(0);
//console.log(ctx,osc);
osc.connect(ctx.destination);

// Create a reference to our oscillator so we
// can call stop on it in stopWave
// notice that this variable was declared outside

// this function so that is is accessible to stopWave
currentOsc = osc;
}

function stopWave() {
currentOsc.stop(0);
}

$('div.inner-circle').on("click tap", function(e) {
e.stopPropagation();
});

//$("").css({"":""});
// make these default in css file, then activate here...
//$(".digit").css({"color":"grey","text-shadow":"none"});
//$("#onOff-btn").css({"background":"maroon"});
//$("#start-btn, #strict-btn").css({"background":"silver"});


$(document).ready(turnOn());

function turnOn() {
$("#onOff-btn").on("click tap", function() {
  simon.on = simon.on === true ? false : true;
  console.log("simon is", simon.on);

  if (simon.on === true && simon.player === false) {
    simon.simon = true;

    $(".digit")
      .html("--")
      .css({"color":"red","text-shadow":"1px 1px 10px red"})
      .animate({opacity:0}, 300).animate({opacity:1}, 300)
      .animate({opacity:0}, 300).animate({opacity:1}, 300);

    $("#onOff-btn, #start-btn, #strict-btn")
      .css({"background":"red"});

    return;
  }

if (simon.on === false && simon.simon === true) {
  shutDown();
  return;
  }
});

$("#start-btn").on("click tap", function(e) {
  if (simon.on === true && simon.start === false) {
    console.log("start was clicked");
    simon.start = true;
    $(".digit")
      .html("00")
      .css({"color":"red","text-shadow":"1px 1px 10px red"})
      .fadeIn();
    setTimeout(playSong, 750, mainCounter);
    return;
  }

  if (simon.on === true && simon.start === true) {
    e.preventDefault();
    $("**").off();
    console.log("start was clicked",
                "\non: ", simon.on,
                "\nstart ", simon.start);
    restart();        
    return;
  }
});

$("#strict-btn").on("click tap", function() {

  if (simon.on === true  && simon.strict === false) {
    simon.strict = true;
    console.log("strict was clicked",
                "\nstrict = ",simon.strict);
    $(this).css({"background":"yellow"});
    return;
  }

  if (simon.on === true  && simon.strict === true) {
    simon.strict = false;
    console.log("strict was clicked",
                "\nstrict = ",simon.strict);
    $(this).css({"background":"red"});
    return;
  }
});
}

function zeroPad(str, len)
{ str = str.toString();
while (str.length < len) {
 str = "0"+str;
} return str;
}

let boxShadowDirection = function(color,x,y,z) {
let result = null, str = "px ";
switch (color)
{ case 'green':
    result = -x + str + -y + str + z + str + color;
    break;
  case 'red':
    result = x + str + -y + str + z + str + color;
    break;
  case 'blue':
    result = x + str + y + str + z + str + color;
    break;
  case 'yellow':
    result = -x + str + y + str + z + str + color;
    break;
} return result;
};

// random number generator
function getRandInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

// random array of twenty colors/sounds generator
let getSong = function() {
let color = ['green', 'red', 'blue', 'yellow'];
//var sound = [greenmp3, redmp3, bluemp3, yellowmp3];
let song = [];
for (let i = 0; i < 20; i++) {
  song.push(color[getRandInt(0, 3)]);
}
return song;
};

// set song as constant for duration of game
let song = getSong();//["green", "red", "blue", "yellow", "green", "red", "blue", "yellow"];

function playSong(playCount) {
if (currentOsc) stopWave();
if (playCount > mainCounter) {
  console.log("calling responder(0)");
  responder(0); //or something???
  return;
} else {
  console.log("song:\n", song, "mainCounter: ", mainCounter,"\nplayCount: ", playCount);
  $(".digit").html(zeroPad(mainCounter+1,2));
  let color = song[playCount];
  flashOn(color, playCount);
  return;
}
}

function flashOn(color, playCount) {
let time = 1000;
time = time - mainCounter * 40;
console.log('flashOn\nplayCount: \n', playCount);
$("#" + color + "-back").css({"background": "white"});
$("#bezel").css({"box-shadow":boxShadowDirection(color,50,50,150)});
startWave(color);
console.log("flash:\n",color);
/*
*
// alternate means of speeding up play speed
if (mainCounter > 4) { time = 800; }
if (mainCounter > 8) { time = 600; }
if (mainCounter > 14) { time = 400; }
*
*/
setTimeout(flashOff, time, playCount);
return;
}

function flashOff(playCount) {
let time = 100;
time = time - mainCounter * 3;
$('.flash').css({"background": "black"});
$("#bezel").css({"box-shadow":""});
console.log('flashOff\nplayCount: \n', playCount);
stopWave();
playCount++;
console.log('playCount++: \n', playCount,
            "\nplaySong(",playCount,")");
/*
*
// alternate means of speeding up play speed
if (mainCounter > 4) { time = 80; }
if (mainCounter > 8) { time = 60; }
if (mainCounter > 14) { time = 40; }
*
*/
setTimeout(playSong, time, playCount);
return;
}

function responder(checkCount) {
simon.player = true;
bigButtonClickHandler(checkCount);
return;
}

function bigButtonClickHandler(checkCount) {
  
   timeLimit = setTimeout(reset, 5000);
  console.log(timeLimit);

let ready = false;
$(".quarter-circle").on('mousedown touchstart',function(e) {
  clearTimeoutAndSounds();
  if (simon.player === true) {
    $("#"+this.id+"-back").css({"background-color": "white"});
    $("#bezel").css({"box-shadow": boxShadowDirection(this.id,50,50,150)});
    startWave(this.id);
    ready = true;

  }
}).on('mouseup mouseout touchmove touchend', function(e) {
  if (ready === true) {
    $(".flash").css("background", "black");
    $("#bezel").css({"box-shadow": ""});
    stopWave();
    ready = false;
    simon.player = false;
    console.log('player clicked: ', this.id,
                "\ncalling checkClick(",checkCount,");");
    $(".quarter-circle").off();
    checkClick(checkCount, this.id);
    return;
  }
});
}

function checkClick(checkCount, color) {

console.log("color: ",color,
            "\nsong[checkCount]: ",song[checkCount]);

if (color !== song[checkCount]) {
  console.log("bad click at\ncheckCount: ", checkCount);
  setTimeout(reset, 150);
  return;
}

if (color === song[checkCount]) {
  console.log("good click at\ncheckCount: ", checkCount);
}

if (checkCount < mainCounter) {
  console.log("checkCount < mainCounter\n",
              checkCount," < ", mainCounter);
  checkCount++;
  console.log("calling responder(",checkCount,");");
  responder(checkCount);
  return;
}

if (mainCounter === (song.length - 1)) {
  console.log("winner, winner, chicken dinner!!!")
  playWinSong(color);
  return;
}

if (checkCount === mainCounter) {
  console.log("checkCount === mainCounter\n",
              checkCount," === ", mainCounter);
  console.log("mainCounter++");
  mainCounter++;
  console.log("calling playSong(0);");
  setTimeout(playSong, 500, 0);
  return;
}
}

function reset() {
  clearTimeoutAndSounds();
if (currentOsc) stopWave();
console.log("BEEEP!!!");
mainCounter = simon.strict === true ? 0 : mainCounter;
song = simon.strict === true ? getSong() : song;
//clearTimeoutAndSounds();
flashBangBang();
return;
}

function restart() {
clearTimeoutAndSounds();
simon.player = false;
//$("div.quarter-circle").off();
$(".digit").html("00");
mainCounter =  0;
song = getSong();
console.log("new game");
  turnOn();
setTimeout(playSong, 750, 0);
return;
}

function shutDown() {
clearTimeoutAndSounds();
simon.player = false;
$(".flash")
  .css({"background":""});
$(".digit")
  .html("88")
  .css({"color":"","text-shadow":""});
$("#onOff-btn")
  .css({"background":"maroon"});
$("#start-btn, #strict-btn")
  .css({"background":"silver"});
$("div.quarter-circle").off();
simon.strict = false;
console.log("stop game");
  turnOn();
return;
}

function clearTimeoutAndSounds() {
// Set a fake timeout to get the highest timeout id
let highestTimeoutId = setTimeout(";");
for (var i = 0 ; i < highestTimeoutId ; i++) {
  //console.log(i);
  clearTimeout(i); }

if (currentOsc) {
  stopWave();
}
}

function flashBangBang() {
startWave("alert");
$(".digit").html("!!")
  .animate({opacity:0}, 75).animate({opacity:1}, 75)
  .animate({opacity:0}, 75).animate({opacity:1}, 75)
  .animate({opacity:0}, 75).animate({opacity:1}, 75)
  .animate({opacity:0}, 75).animate({opacity:1}, 75)
  .animate({opacity:0}, 75).animate({opacity:1}, 75)
  .animate({opacity:0}, 75).animate({opacity:1}, 75);
setTimeout(stopWave, 900);
setTimeout(playSong, 1300, 0);
return;
}

function playWinSong(color) {		
// write the function that animates one cycle (include all selectors that you want animated), then call setInterval to repeat it, use a counter to clearInterval...

// set lcd text
$(".digit").html("**");

// animate elements
let int50 = null,
    play = true,
    counter = 0,
    a = 0,   // horizontal offset
    b = 0,   // vertical offset
    c = 5, // blur radius
    d = 5,   // spread radius
    f = 0.1, // opacity
    g = 0;

int50 = setInterval(function() {
  if (play === true) {
    a += 13;
    b += 37;
    //c += 5;
    d += 5;
    f += 0.8;
    g += 0.05;
    counter ++;
    console.log(g);
    // bezel box-shadow
    $("#bezel")
      .css({"box-shadow":
            + -a + "px " + -b + "px " + c + "px " + -d + "px rgba(62,221,75,"  + f + "), "
            + a  + "px " + -b + "px " + c + "px " + d + "px rgba(221,75,62,"  + f + "), "
            + -a + "px " + b  + "px " + c + "px " + -d + "px rgba( 5,62,221,"  + f + "), "
            + a  + "px " + b  + "px " + c + "px " + d + "px rgba(255,234,55," + f + ")  "
           });


    a = a >= 90 ? -90 : a;
    b = b >= 90 ? -90 : b;
    //c = c >= 25 ? -25 : c;
    d = d >= 25 ?  -25 : d;
    //f = f >= 1 ? 0 : f;
    g = g < 1 ? g : 0;


    // animate big buttons
    if (g < 0.5) {
      $(".flash").addClass("active");
      $(".digit").css({"opacity":0});
    } else {
      $(".flash").removeClass("active");
      $(".digit").css({"opacity":1});
    }
  }
}, 15);

function clear() {
    play = false;
    $("#bezel").css({"box-shadow": ""});
    $(".flash").css({"background":""});
    $(".digit").css({"opacity":""});
    counter = 0;
    shutDown();
    return;
  }

// stop animation (requires user input)		
setTimeout(clear, 5000);


return;
}

//playWinSong("red");

}());