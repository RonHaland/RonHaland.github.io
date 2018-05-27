window.onload = function() {
  var c = document.getElementById("myCanvas");
  generateImage(data,c);
}

function generateImage(json, canv){

  var ctx = canv.getContext("2d");
  var data = json
  //player
  ctx.fillStyle="#00A000";
  ctx.fillRect(data.player.x-14,data.player.y-14, 28, 28);
  //goal
  ctx.fillStyle="#00A0C0";
  ctx.fillRect(data.goal.x-32,data.goal.y-32, 64, 64);
  for (var i = 0; i<data.walls.length; i++){
    ctx.fillStyle="#707070";
    ctx.fillRect(data.walls[i].x-16,data.walls[i].y-16, 32, 32);
  }
}

/*
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
for (var i=0; i<50; i++){
	ctx.fillStyle="#FF0000";
    if (i%3 == 0) {ctx.fillStyle="#FFFF00";}

	ctx.fillRect((i%10)*32,Math.floor(i/10)*32, 32, 32);
}
*/
