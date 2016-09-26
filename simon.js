/* jshint esversion:6 */

// ToDo
// increase speed at 5, 9 & 15
// set time limit on responce
// clear all variables when turned off
// 

(function() { //

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

  window.AudioContext = window.AudioContext;

  // Create a new instance of AudioContext
  // for the game sounds
  var ctx = new AudioContext();
  var currentOsc;
  var scale = {
    green: 415.305,
    red: 311.127,
    blue: 207.652,
    yellow: 247.942,
    alert: 42,
    currentOsc: null
  };

  function startWave(color) {
    var osc = ctx.createOscillator();
    osc.frequency.value = scale[color];
    osc.type = 'square';
    osc.start(0);
    osc.connect(ctx.destination);

    // Create a reference to our oscillator so we
    // can call stop on it in stopWave
    // notice that this variable was declared outside

    // this function so that is is accessible to stopWave
    scale.currentOsc = osc;
  }

  function stopWave() {
    scale.currentOsc.stop(0);
  }

  $('div.inner-circle').on("click tap", function(e) {
    e.stopPropagation();
  });

  //$("").css({"":""});
  $(".digit").css({"color":"grey","text-shadow":"none"});
  $("#onOff-btn").css({"background":"maroon"});
  $("#start-btn, #strict-btn").css({"background":"silver"});


  $(document).ready(turnOn());

  function turnOn() {
    $("#onOff-btn").on("click tap", function() {
      simon.on = simon.on === true ? false : true;
      let onOff = null; onOff = simon.on === true ? "On" : "Off";
      console.log("simon is",onOff);

      if (simon.on === true && simon.player === false) {
        simon.simon = true;
        $(".digit").html("00").css({"color":"","text-shadow":""});
        $("#onOff-btn, #start-btn, #strict-btn").css({"background":"red"});
        return;
      }

      if (simon.on === false && simon.simon === true) {
        turnOff();
        $(".digit").html("88").css({"color":"grey","text-shadow":"none"});
        $("#onOff-btn").css({"background":"maroon"});
        $("#start-btn, #strict-btn").css({"background":"silver"});
        $("div.quarter-circle").off();
        simon.player = false;
        return;
      }
    });

    $("#start-btn").on("click tap", function(e) {
      if (simon.on === true && simon.start === false) {
        console.log("start was clicked");
        simon.start = true;
        setTimeout(playSong, 750, mainCounter);
        //$("#start-btn").off(); //this is not a solution
        return;
      }

      if (simon.on === true && simon.start === true) {
        e.preventDefault();
        // write a restart function
        console.log("start was clicked",
                    "\non: ", simon.on,
                    "\nstart ", simon.start);
        restart();
        $("div.quarter-circle").off();
        simon.player = false;
        $(".digit").html("00").css({"color":"","text-shadow":""});
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
    if (scale.currentOsc) stopWave();
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
    time = time - mainCounter * 50;
    console.log('flashOn\nplayCount: \n', playCount);
    $("#" + color + "-back").css({"background": "white"});
    $("#bezel").css({"box-shadow":boxShadowDirection(color,50,50,150)});
    startWave(color);
    console.log("flash:\n",color);
    /*if (mainCounter > 4) { time = 800; }
	if (mainCounter > 8) { time = 600; }
	if (mainCounter > 14) { time = 400; }*/
    setTimeout(flashOff, time, playCount);
    return;
  }

  function flashOff(playCount) {
    let time = 100;
    time = time - mainCounter * 5;
    $('.flash').css({"background": "black"});
    $("#bezel").css({"box-shadow":""});
    console.log('flashOff\nplayCount: \n', playCount);
    stopWave();
    playCount++;
    console.log('playCount++: \n', playCount,
                "\nplaySong(",playCount,")");
    /*if (mainCounter > 4) { time = 80; }
	if (mainCounter > 8) { time = 60; }
	if (mainCounter > 14) { time = 40; }*/
    setTimeout(playSong, time, playCount);
    return;
  }

  function responder(checkCount) {
    simon.player = true;
    bigButtonClickHandler(checkCount);
    return;
  }

  function bigButtonClickHandler(checkCount) {
    let ready = false;
    $(".quarter-circle").on('mousedown touchstart',function(e) {
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
      reset();
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
      setTimeout(playSong, 500, 0);
      return;
    }
  }

  function reset() {
    if (scale.currentOsc) stopWave();
    console.log("BEEEP!!!");
    mainCounter = simon.strict === true ? 0 : mainCounter;
    song = simon.strict === true ? getSong() : song;
    flashBangBang();
    return;

  }

  function restart() {
    if (scale.currentOsc) stopWave();
    console.log("new game");
    mainCounter =  0;
    song = getSong();
    setTimeout(playSong, 750, 0);
    return;

  }

  function turnOff() {
    if (scale.currentOsc) stopWave();
    console.log("stop game");
    return;

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

}());