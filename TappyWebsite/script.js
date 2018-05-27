var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
for (var i=0; i<50; i++){
	ctx.fillStyle="#FF0000";
    if (i%3 == 0) {ctx.fillStyle="#FFFF00";}

	ctx.fillRect((i%10)*32,Math.floor(i/10)*32, 32, 32);
}
