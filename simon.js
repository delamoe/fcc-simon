/* jshint esversion:6 */
/* jslint esversion:6 */

/*var game = {
  state: {
    on: false,
    start: false,
    simon: false,
    player: false,
    strict: false,
    win: false
  }
};

$('#onOff').on('click tap', function() {
  game.state.on = true;
});
game.state.player = true;
*/

$('.inner-circle').click(function(e) {
  e.stopPropagation();
});

$(".quarter-circle").on('mousedown touchstart',function() {
  //if (game.state.player === true) {
  $(this).addClass("active");
  //}
});

$(".quarter-circle").on('mouseup mouseout touchmove touchend ', function() {
  $(this).removeClass("active");
});


// create random array of twenty colors/sounds
function getSong() {
    var beepDuration, color = ['green', 'red', 'blue', 'yellow'];
    //var sound = [greenmp3, redmp3, bluemp3, yellowmp3];
    
    var song = [];
    for (var i = 0; i < 20 ; i++ ) {
        song.push(color[getRandInt(0, 3)]);
        // define length of flash in order to
        // increase speed of demo at 5, 9 & 15
        /*if (song.length < 5) {
            beepDuration = 1000;
        } else if (song.length < 9) {
            beepDuration = 700;
        } else {
            beepDuration = 400;
               }*/
        for ( var j in song ) {
            $("." + song[j]).addClass("active");
            setTimeout($("." + song[j]).removeClass("active"), 2000);
            console.log("." + song[j]);
        }
        
    }
}

getSong();
    

// play color/sounds on start button press
// record player input and match to array
// make inside button borders rounded
// stop click propagation on borders
// add onOff switch -- slide to indicate
// add play buttton -- light up to indicate

// add LCD to indicate what level is active
// add strict button -- light up to indicate
// play winner or loser song/light show
//

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}