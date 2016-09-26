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
  let beepTime = {
	  flashOn: null,
	  flashOff: null,
	  
  }

  const simon = game.state;
  let // mainCounter will log the turns
  mainCounter= 0;

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
		let onOff = simon.on === true ? "Off" : "On";

console.log(console)

      if (simon.on === true && simon.player === false) {
        //simon.playAround = true;
        $(".digit").html("00").css({"color":"","text-shadow":""});
        $("#onOff-btn, #start-btn, #strict-btn").css({"background":"red"});
      } else {
        $(".digit").html("88").css({"color":"grey","text-shadow":"none"});
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

		
        setTimeout(playSong, 750, mainCounter);
      }
    });

    $("#strict-btn").on("click tap", function() {
      if (simon.on === true  && simon.strict === false) {
        simon.strict = true;

        $(this).css({"background":"yellow"});
        //if (simon.strict === ) {}
      } else  if (simon.on === true  && simon.strict === true) {
        simon.strict = false;

        $(this).css({"background":"red"});
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

    if (playCount > mainCounter) {

      responder(0); //or something???
      return;
    } else {

      $(".digit").html(zeroPad(mainCounter+1,2));
      let color = song[playCount],
          elementId = "#"+color;
      flashOn(elementId, playCount);
      return;
    }
  }

  function flashOn(elementId, playCount) {

    $(elementId+"-back").css({"background-color": "white"});

    setTimeout(flashOff, 1000, playCount);
    return;
  }

  function flashOff(playCount) {
    $('.flash').css({"background-color": "black"});

    playCount++;

    setTimeout(playSong, 300, playCount);
    return;
  }

  function responder(checkCount) {
    simon.player = true;
    bigButtonClickHandler(checkCount);
    return;
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
        ready = false;
        simon.player = false;

        $("div.quarter-circle").off();
        checkClick(checkCount, this.id);
        return;
      }
    });
  }

  function checkClick(checkCount, color) {


    if (color !== song[checkCount]) {

      clickedWrong();
      return;
    }

    if (color === song[checkCount]) {

    }

    if (checkCount < mainCounter) {

      checkCount++;

      responder(checkCount);
      return;
    }

    if (checkCount === mainCounter) {


      mainCounter++;

      setTimeout(playSong, 750, 0);
      return;
    }
  }

  function clickedWrong() {

    mainCounter = simon.strict === true ? 0 : mainCounter;
    flashBangBang();
    return;
  }

  function flashBangBang() {
    $(".digit").html("!!").animate({opacity:0}, 150).animate({opacity:1}, 150).animate({opacity:0}, 150).animate({opacity:1}, 150).animate({opacity:0}, 150).animate({opacity:1}, 150);
    setTimeout(playSong, 1200, 0);
    return;
  }

}());