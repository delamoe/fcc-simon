/* jshint esversion:6 */

console.log();
//(function() { //

const game = {
  state: {
    on: false,
    start: false,
    simon: false,
    player: false,
    strict: false,
    win: false,
    lcdOn: false,
    playAround: false
  }
};

const simon = game.state;
let // mainCounter will log the turns
mainCounter= 0;

$('div.inner-circle').on("click tap", function(e) {
  e.stopPropagation();
});

//$("").css({"":""});
$("#lcd").css({"color":"grey","text-shadow":"none"});
$("#onOff-btn").css({"background":"maroon"});
$("#start-btn, #strict-btn").css({"background":"silver"});


$(document).ready(turnOn());

function turnOn() {
  $("#onOff-btn").on("click tap", function() {
    simon.on = simon.on === true ? false : true;
    console.log("simon: ",simon.on);

    if (simon.on === true && simon.player === false) {
      //simon.playAround = true;
      $("#lcd").html("00").css({"color":"","text-shadow":""});
      $("#onOff-btn, #start-btn, #strict-btn").css({"background":"red"});
    } else {
      $("#lcd").html("88").css({"color":"grey","text-shadow":"none"});
      $("#onOff-btn").css({"background":"maroon"});
      $("#start-btn, #strict-btn").css({"background":"silver"});

      simon.on = false;
      simon.start = false;
      simon.simon = false;
      simon.player = false;
      simon.strict = false;
      simon.win = false;
      simon.lcdOn = false;
      simon.playAround = false;
      mainCounter = 0;
      playCount = 0;
      checkCount = 0;

    }
  });

  $("#start-btn").on("click tap", function() {
    if (simon.on === true) {
      simon.simon = true;
      simon.playAround = false;
      console.log("start was clicked");
      setTimeout(playSong, 500,mainCounter);
    }
  });

  $("#strict-btn").on("click tap", function() {
    if (simon.on === true  && simon.strict === false) {
      simon.strict = true;
      console.log("strict was clicked",
                  "\nstrict = ",simon.strict);
      $(this).css({"background":"yellow"});
      //if (simon.strict === ) {}
    } else  if (simon.on === true  && simon.strict === true) {
      simon.strict = false;
      console.log("strict was clicked",
                  "\nstrict = ",simon.strict);
      $(this).css({"background":"red"});
    }
  });
}

// play color/sounds on start button press
// record player input and match to array
// make inside button borders rounded
// add onOff switch -- slide to indicate
// add play buttton -- light up to indicate
// increase speed of demo at 5, 9 & 15
// add LCD to indicate what level is active
// add strict button -- light up to indicate
// play winner or loser song/light show
//

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
      result = -x + str + y + str + 2*z + str + color;
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
    //console.log('13: ',song[i]);
  }
  return song;
};

// set song as constant for duration of game
let song = getSong();//["green", "red", "blue", "yellow", "green", "red", "blue", "yellow"];

function playSong(playCount) {

  if (playCount > mainCounter) {
    console.log("calling responder(0)");
    responder(0); //or something???
    return;


  } else {


    console.log("song:\n", song, "mainCounter: ", mainCounter,"\nplayCount: ", playCount);
    $("#lcd").html(zeroPad(mainCounter+1,2));
    let color = song[playCount],
        elementId = "#"+color;
    flashOn(elementId, playCount);
    return;
  }
}

function flashOn(elementId, playCount) {
  console.log('flashOn\nplayCount: \n', playCount);
  $(elementId+"-back").css({"background-color": "white"});
  console.log("flash:\n",elementId);
  setTimeout(flashOff, 1000, playCount);
  return;
}

function flashOff(playCount) {
  $('.flash').css({"background-color": "black"});
  console.log('flashOff\nplayCount: \n', playCount);
  playCount++;
  console.log('playCount++: \n', playCount,
              "\nplaySong(",playCount,")");
  setTimeout(playSong, 250, playCount);
  return;

}





function responder(checkCount) {
  simon.player = true;
  bigButtonClickHandler(checkCount);
  return;
  // function to check clicks against song[0]

  // through song[mainCounter]
  // if correct, then
  // else playSong(0)
  // when mainCounter is reached

  // playSong(0)

}

function bigButtonClickHandler(checkCount) {
  let ready = false;
  $("div.quarter-circle").on('mousedown touchstart',function(e) {
    if (simon.player === true) {
      $("#"+this.id+"-back").css({"background-color": "white"});
      $("#bezel").css({"box-shadow": boxShadowDirection(this.id,0,0,150)});
      ready = true;

    }
  }).on('mouseup mouseout touchmove touchend', function(e) {
    if (ready === true) {
      $(".flash").css("background", "black");
      $("#bezel").css({"box-shadow": ""});
      //$("#control-panel").css({"box-shadow": "", "border":""});
      //$(this).removeClass("active");
      //console.log(e);
      ready = false;
      simon.player = false;
      console.log('player clicked: ', this.id,
                  "\ncalling checkClick(",checkCount,");");
      $("div.quarter-circle").off();

      checkClick(checkCount, this.id);

      return;


      // need call the function here instead of returning the color
      // psuedoCode: checkClick(this.id);
    }
  });
}

function checkClick(checkCount, color) {
  //checkCount = checkCount > 0 ? checkCount : x;
  console.log("color: ",color,
              "\nsong[checkCount]: ",song[checkCount]);

  if (color !== song[checkCount]) {
    console.log("bad click at\ncheckCount: ", checkCount);
    //mainCounter = simon.strict === true ? 0 : mainCounter;
    clickedWrong();
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

  if (checkCount === mainCounter) {
    console.log("checkCount === mainCounter\n",
                checkCount," === ", mainCounter);
    console.log("mainCounter++");
    mainCounter++;
    console.log("calling playSong(0);");
    setTimeout(playSong, 750, 0);
    return;
  }

  // maybe I should breakout the click handler
  // into it's own function, i could put it 
  // back up where it belongs or stick it...
  // NEVERMIND, put all the functions elsewhere
  // and make it easier to track output!!
}

function clickedWrong() {
  console.log("BEEEP!!!");
  setTimeout(playSong, 750, 0);
  console.log("BEEEP!!! (after setTimeout...)");
  return;
}

//console.log("checkClick:\n",song[checkCount]);

//this.id = null;
//}());