$(document).ready(function() {
  playerTurn = 1, Score = [], card1 = -1, card2 = -1, card1ind = -1, card2ind = -1;
  Score[1] = 0, Score[2] = 0;
  valueArray = [];
  animationReady = 1;
  $("#welcome").click(function(){
    $("#cardboard").css("display","block");
    $("#scoreboard").css("display","block");
    $("#name1").css("color","red");
    $(this).css("display","none");
    deal(4);
    $("#cardboard").on("click", ".card", function() {
      turnCard($(this));
    });
  });
  function deal(x){
    $("#cardboard").empty();
    var sizeCols = x;
    var sizeRows = x;
    for (var i=0; i<x*x; i++){
      valueArray[i] = Math.floor(i/2);
    }
    console.log(valueArray);
    valueArray = shuffleCards(valueArray);
    console.log(valueArray);
    var card;
    var index=0;
    for(var row = 0; row < sizeRows; row++){
      for (var col = 0; col < sizeCols; col++){

        card = $("<div></div>").addClass("card");
        if (col == 0) {
          card.addClass("clearleft");
        }
        card.attr('id','x' + index);
        card.addClass("" + valueArray[index++]);
        $("#cardboard").append(card);
      }
    }
    cardWidth = card.outerWidth(true);
    $("#cardboard").width(sizeCols * cardWidth);
  }
});


function turnCard(card){
  if (animationReady){
    var ind = card.prop('id').split('x')[1];
    if (!card.hasClass('done')){
      console.log(ind);
      if(card1 < 0){
        card1 = valueArray[ind];
        card1ind = ind;
        flipAnimation(card, 0);
      }
      else if(card1 > -1 && card2 < 0 && ind !== card1ind){
        card2 = valueArray[ind];
        card2ind = ind;
        flipAnimation(card, 0);
        turnChange();

      }
    }
  }
}
function turnChange(){
  c1 = $("#x"+card1ind);
  c2 = $("#x"+card2ind);
  if (card1 === card2){
    Score[playerTurn] += 1;
    c1.addClass('done');

    c2.addClass('done');
    setTimeout(function(){
      c1.css("opacity","0.5");
      c2.css("opacity","0.5");
    }, 1500);
    $("#p"+playerTurn).text("" + Score[playerTurn]);
  }
  else if (playerTurn === 1){playerTurn = 2; $("#name2").css("color","red");$("#name1").css("color","white");}
  else if(playerTurn === 2){playerTurn = 1; $("#name1").css("color","red");$("#name2").css("color","white");}
  if (card1 !== card2){
    flipAnimation(c1,1);
    flipAnimation(c2,1);
  }
  card1 = -1;
  card2 = -1;
  card1ind = -1;
  card2ind = -1;
}
function flipAnimation(card, reverse){
  if (!reverse){
    var jeff = card.attr('class').split(' ');
    jeff  = jeff[jeff.length-1];
    console.log(jeff);
    animationReady = 0;
    card.animate({width:0, marginLeft:40, marginRight:40}, 500, function(){
      card.css('background-image', 'url(images/Jeff' + jeff + '.jpg)');
      card.animate({width:70, marginLeft:5, marginRight:5}, 500);
      animationReady = 1;
    });
  } else{
    setTimeout(function(){
    animationReady = 0;
    card.animate({width:0, marginLeft:40, marginRight:40}, 500, function(){
      card.css('background-image', 'none');
      card.animate({width:70, marginLeft:5, marginRight:5}, 500);
      animationReady = 1;
    });
  }, 1500);
  }
}
//Shuffle an array
function shuffleCards(a){
  for (var i = a.length - 1; i > 0; i--){
    var n = Math.floor(Math.random()*a.length);
    var temp = a[i];
    a[i] = a[n];
    a[n] = temp;
  }
  return a;

}
