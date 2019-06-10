var d = new Date();

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);
  var interval

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + 31;
  }
}
window.onload = function() {
    var str = document.getElementById('string')
    str.innerHTML = "It's the " + timeSince(new Date(d.getFullYear()-1,10,1,0,0,0,0)) + "-th of October"
}
