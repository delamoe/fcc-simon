/* jshint esversion:6 */

var game = {
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

$('.inner-circle').click(function(e) {
  e.stopPropagation();
});

$(".quarter-circle").on('mousedown touchstart',function() {
  if (game.state.player === true) {
  $(this).addClass("active");
  }
});

$(".quarter-circle").on('mouseup mouseout touchmove touchend ', function() {
  $(this).removeClass("active");
});
