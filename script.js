newid = 0;
list = [new Entry("Ronny Haland", "46857328", "RonnyHaland@gmail.com"),
        new Entry("Stein Olavson", "81274994", "Stein@jodlemail.com"),
        new Entry("James Bond", "00700700", "double0@sevenmail.com")];
isAdding = 0;
isSetting = 0;
function Entry(name, tlf, email){
  this.id = newid++;
  this.name = name;
  this.tlf = tlf;
  this.email = email;
}
function init() {
  drawEntries();
}
function drawEntries(){
  var content = document.getElementById("content");
  content.innerHTML = "";
  for(var i=0; i < list.length; i++){
    var entry = '<article id="id' + list[i].id + '">'
              + '<div class="info">'
              + '<h3>' + list[i].name + '</h3>'
              + '<h5>' + list[i].tlf + '</h5>'
              + '<a href="mailto:' + list[i].email + '"><h5>' + list[i].email + '</h5></a>'
              + '</div>'
              + '<div class="edit" ><span onclick="edititem('+list[i].id+');" class="editEntry fa fa-pencil-square-o"></span>'
              + '<span onclick="deleteitem('+list[i].id+');" class="delEntry fa fa-trash-o"></span>'
              + '</div>'
              + '</article>';
    content.innerHTML += entry;
  }
}
function deleteitem(id){

  for(var i=0; i < list.length; i++){
    if (list[i].id == id){
      var conf = confirm("Do you really want to delete " + list[i].name + " from the contact list?");
      if (conf){
        list.splice(i, 1);
        var parent = document.getElementById('content');
        var child = document.getElementById('id'+id);
        parent.removeChild(child);
      }
    }
  }
}
function openAdder(){
  var adder = document.getElementById('adder');
  var editor = document.getElementById('edit');
  var option = document.getElementById('settings');
  if (isAdding == 0){
    isAdding = 1;
    isEditing = 0;
    isSetting = 0;
    adder.style.display = 'block';
    editor.style.display = 'none';
    option.style.display = 'none';
  }
  else{
    isAdding = 0;
    adder.style.display = 'none';
  }
}
function edititem(id){
  var adder = document.getElementById('adder');
  var editor = document.getElementById('edit');
  var option = document.getElementById('settings');
  var editButton = document.getElementById('editButton');
  var EditName = document.getElementById('EditName');
  var EditPhone = document.getElementById('EditPhone');
  var Editemail = document.getElementById('Editemail');
  var name, phone, email;
  for(var i = 0; i < list.length; i++){
    if (list[i].id == id){
      name = list[i].name;
      phone = list[i].tlf;
      email = list[i].email;
    }
  }
  document.getElementById('editHead').innerHTML = "Edit Entry for " + name;
  EditName.value = name;
  EditPhone.value = phone;
  Editemail.value = email;
  isAdding = 0;
  isSetting = 0;
  adder.style.display = 'none';
  editor.style.display = 'block';
  option.style.display = 'none';
  editButton.setAttribute("onclick", 'edit('+id+');');

}
function closeEdit(){
  var editor = document.getElementById('edit');
  editor.style.display = 'none';
}
function add(){
  var name = document.getElementById("AddName").value;
  var phone = document.getElementById("AddPhone").value;
  var email = document.getElementById("Addemail").value;
  if (validateNewEntry(name, phone, email)){
    isAdding = 0;
    adder.style.display = 'none';
    list.push(new Entry(name, phone, email));
    var nid = list[list.length-1].id;
    var entry = '<article id="id' + nid + '">'
              + '<div class="info">'
              + '<h3>' + name + '</h3>'
              + '<h5>' + phone + '</h5>'
              + '<a href="mailto:' + email + '"><h5>' + email + '</h5></a>'
              + '</div>'
              + '<div class="edit" ><span onclick="edititem('+nid+');" class="editEntry fa fa-pencil-square-o"></span>'
              + '<span onclick="deleteitem('+nid+');" class="delEntry fa fa-trash-o"></span>'
              + '</div>'
              + '</article>';
    content.innerHTML += entry;
    document.getElementById("AddName").value = '';
    document.getElementById("AddPhone").value = '';
    document.getElementById("Addemail").value = '';
  }
  else{
    document.getElementById("AddName").value = '';
    document.getElementById("AddPhone").value = '';
    document.getElementById("Addemail").value = '';
  }
  init();
}
function edit(id){
  var name = document.getElementById("EditName").value;
  var phone = document.getElementById("EditPhone").value;
  var email = document.getElementById("Editemail").value;
  var editor = document.getElementById('edit');
  var index;
  for(var i = 0; i<list.length; i++){
    if (list[i].id == id){
      index = i;
    }
  }
  if (validateNewEntry(name, phone, email)){
    editor.style.display = 'none';
    list[index].name = name;
    list[index].tlf = phone;
    list[index].email = email;
    var entry = '<div class="info">'
              + '<h3>' + name + '</h3>'
              + '<h5>' + phone + '</h5>'
              + '<a href="mailto:' + email + '"><h5>' + email + '</h5></a>'
              + '</div>'
              + '<div class="edit" ><span onclick="edititem('+id+');" class="editEntry fa fa-pencil-square-o"></span>'
              + '<span onclick="deleteitem('+id+');" class="delEntry fa fa-trash-o"></span>'
              + '</div>';
    document.getElementById('id' + id).innerHTML = entry;
    document.getElementById("EditName").value = '';
    document.getElementById("EditPhone").value = '';
    document.getElementById("Editemail").value = '';
  }
  else{
    document.getElementById("EditName").value = list[index].name;
    document.getElementById("EditPhone").value = list[index].tlf;
    document.getElementById("Editemail").value = list[index].email;
  }
}
function validateNewEntry(name, phone, email){
  var nameOK, phoneOK, emailOK;
  if ((typeof name === 'string') && (name.length>0)){
    nameOK = true;
  }
  if (phone.length>5){
    phoneOK = true;
    for (var i = 0; i < phone.length; i++){
      var c = phone.charAt(i);
      if ((!/[0-9]/.test(c)) && (c != '-') && (c != '+')){
        phoneOK = false
        break;
      }
    }
  }
  if (email.length>5) {
    var s = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailOK = s.test(email);
  }
  return(nameOK && (emailOK || phoneOK));
}
function search(){
  var s = document.getElementById('searchFor');
  var str = document.getElementById('searchBar').value.toLowerCase();
  var c = document.getElementById('content');
  c.innerHTML = '';

  for(var i = 0; i < list.length; i++){
    var isPrinted = 0;
    if (list[i].name.toLowerCase().search(str) > -1 && isPrinted == 0){
      var entry = '<article id="id' + list[i].id + '">'
                + '<div class="info">'
                + '<h3>' + list[i].name + '</h3>'
                + '<h5>' + list[i].tlf + '</h5>'
                + '<a href="mailto:' + list[i].email + '"><h5>' + list[i].email + '</h5></a>'
                + '</div>'
                + '<div class="edit" ><span onclick="edititem('+list[i].id+');" class="editEntry fa fa-pencil-square-o"></span>'
                + '<span onclick="deleteitem('+list[i].id+');" class="delEntry fa fa-trash-o"></span>'
                + '</div>'
                + '</article>';
      c.innerHTML += entry;
      isPrinted = 1;
    }
    if (list[i].tlf.toLowerCase().search(str) > -1 && isPrinted == 0){
      var entry = '<article id="id' + list[i].id + '">'
                + '<div class="info">'
                + '<h3>' + list[i].name + '</h3>'
                + '<h5>' + list[i].tlf + '</h5>'
                + '<a href="mailto:' + list[i].email + '"><h5>' + list[i].email + '</h5></a>'
                + '</div>'
                + '<div class="edit" ><span onclick="edititem('+list[i].id+');" class="editEntry fa fa-pencil-square-o"></span>'
                + '<span onclick="deleteitem('+list[i].id+');" class="delEntry fa fa-trash-o"></span>'
                + '</div>'
                + '</article>';
      c.innerHTML += entry;
      isPrinted = 1;
    }
    if (list[i].email.toLowerCase().search(str) > -1 && isPrinted == 0){
      var entry = '<article id="id' + list[i].id + '">'
                + '<div class="info">'
                + '<h3>' + list[i].name + '</h3>'
                + '<h5>' + list[i].tlf + '</h5>'
                + '<a href="mailto:' + list[i].email + '"><h5>' + list[i].email + '</h5></a>'
                + '</div>'
                + '<div class="edit" ><span onclick="edititem('+list[i].id+');" class="editEntry fa fa-pencil-square-o"></span>'
                + '<span onclick="deleteitem('+list[i].id+');" class="delEntry fa fa-trash-o"></span>'
                + '</div>'
                + '</article>';
      c.innerHTML += entry;
      isPrinted = 1;
    }
  }
}
window.onload = init;




window.FontAwesomeCdnConfig = {
  autoA11y: {
    enabled: false
  },
  asyncLoading: {
    enabled: false
  },
  reporting: {

    enabled: true,
    domains: "localhost, *.dev"

  },
  useUrl: "use.fontawesome.com",
  faCdnUrl: "https://cdn.fontawesome.com:443",
  code: "8d189dfc61"
};
!function(){function a(a){var b,c=[],d=document,e=d.documentElement.doScroll,f="DOMContentLoaded",g=(e?/^loaded|^c/:/^loaded|^i|^c/).test(d.readyState);g||d.addEventListener(f,b=function(){for(d.removeEventListener(f,b),g=1;b=c.shift();)b()}),g?setTimeout(a,0):c.push(a)}function b(a,b){var c=!1;return a.split(",").forEach(function(a){var d=new RegExp(a.trim().replace(".","\\.").replace("*","(.*)"));b.match(d)&&(c=!0)}),c}function c(a){"undefined"!=typeof MutationObserver&&new MutationObserver(a).observe(document,{childList:!0,subtree:!0})}function d(a){var b,c,d,e;a=a||"fa",b=document.querySelectorAll("."+a),Array.prototype.forEach.call(b,function(a){c=a.getAttribute("title"),a.setAttribute("aria-hidden","true"),d=a.nextElementSibling?!a.nextElementSibling.classList.contains("sr-only"):!0,c&&d&&(e=document.createElement("span"),e.innerHTML=c,e.classList.add("sr-only"),a.parentNode.insertBefore(e,a.nextSibling))})}!function(){"use strict";function a(a){l.push(a),1==l.length&&k()}function b(){for(;l.length;)l[0](),l.shift()}function c(a){this.a=m,this.b=void 0,this.f=[];var b=this;try{a(function(a){f(b,a)},function(a){g(b,a)})}catch(c){g(b,c)}}function d(a){return new c(function(b,c){c(a)})}function e(a){return new c(function(b){b(a)})}function f(a,b){if(a.a==m){if(b==a)throw new TypeError;var c=!1;try{var d=b&&b.then;if(null!=b&&"object"==typeof b&&"function"==typeof d)return void d.call(b,function(b){c||f(a,b),c=!0},function(b){c||g(a,b),c=!0})}catch(e){return void(c||g(a,e))}a.a=0,a.b=b,h(a)}}function g(a,b){if(a.a==m){if(b==a)throw new TypeError;a.a=1,a.b=b,h(a)}}function h(b){a(function(){if(b.a!=m)for(;b.f.length;){var a=b.f.shift(),c=a[0],d=a[1],e=a[2],a=a[3];try{0==b.a?e("function"==typeof c?c.call(void 0,b.b):b.b):1==b.a&&("function"==typeof d?e(d.call(void 0,b.b)):a(b.b))}catch(f){a(f)}}})}function i(a){return new c(function(b,c){function d(c){return function(d){g[c]=d,f+=1,f==a.length&&b(g)}}var f=0,g=[];0==a.length&&b(g);for(var h=0;h<a.length;h+=1)e(a[h]).c(d(h),c)})}function j(a){return new c(function(b,c){for(var d=0;d<a.length;d+=1)e(a[d]).c(b,c)})}var k,l=[];k=function(){setTimeout(b)};var m=2;c.prototype.g=function(a){return this.c(void 0,a)},c.prototype.c=function(a,b){var d=this;return new c(function(c,e){d.f.push([a,b,c,e]),h(d)})},window.Promise||(window.Promise=c,window.Promise.resolve=e,window.Promise.reject=d,window.Promise.race=j,window.Promise.all=i,window.Promise.prototype.then=c.prototype.c,window.Promise.prototype["catch"]=c.prototype.g)}(),function(){function a(a){this.el=a;for(var b=a.className.replace(/^\s+|\s+$/g,"").split(/\s+/),c=0;c<b.length;c++)d.call(this,b[c])}function b(a,b,c){Object.defineProperty?Object.defineProperty(a,b,{get:c}):a.__defineGetter__(b,c)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var c=Array.prototype,d=c.push,e=c.splice,f=c.join;a.prototype={add:function(a){this.contains(a)||(d.call(this,a),this.el.className=this.toString())},contains:function(a){return-1!=this.el.className.indexOf(a)},item:function(a){return this[a]||null},remove:function(a){if(this.contains(a)){for(var b=0;b<this.length&&this[b]!=a;b++);e.call(this,b,1),this.el.className=this.toString()}},toString:function(){return f.call(this," ")},toggle:function(a){return this.contains(a)?this.remove(a):this.add(a),this.contains(a)}},window.DOMTokenList=a,b(Element.prototype,"classList",function(){return new a(this)})}}();var e=function(a,b,c){function d(a){return g.body?a():void setTimeout(function(){d(a)})}function e(){h.addEventListener&&h.removeEventListener("load",e),h.media=c||"all"}var f,g=window.document,h=g.createElement("link");if(b)f=b;else{var i=(g.body||g.getElementsByTagName("head")[0]).childNodes;f=i[i.length-1]}var j=g.styleSheets;h.rel="stylesheet",h.href=a,h.media="only x",d(function(){f.parentNode.insertBefore(h,b?f:f.nextSibling)});var k=function(a){for(var b=h.href,c=j.length;c--;)if(j[c].href===b)return a();setTimeout(function(){k(a)})};return h.addEventListener&&h.addEventListener("load",e),h.onloadcssdefined=k,k(e),h},f=null;!function(){function a(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function b(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function b(){document.removeEventListener("DOMContentLoaded",b),a()}):document.attachEvent("onreadystatechange",function c(){"interactive"!=document.readyState&&"complete"!=document.readyState||(document.detachEvent("onreadystatechange",c),a())})}function c(a){this.a=document.createElement("div"),this.a.setAttribute("aria-hidden","true"),this.a.appendChild(document.createTextNode(a)),this.b=document.createElement("span"),this.c=document.createElement("span"),this.h=document.createElement("span"),this.f=document.createElement("span"),this.g=-1,this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;",this.b.appendChild(this.h),this.c.appendChild(this.f),this.a.appendChild(this.b),this.a.appendChild(this.c)}function d(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:"+b+";"}function e(a){var b=a.a.offsetWidth,c=b+100;return a.f.style.width=c+"px",a.c.scrollLeft=c,a.b.scrollLeft=a.b.scrollWidth+100,a.g!==b?(a.g=b,!0):!1}function g(b,c){function d(){var a=f;e(a)&&a.a.parentNode&&c(a.g)}var f=b;a(b.b,d),a(b.c,d),e(b)}function h(a,b){var c=b||{};this.family=a,this.style=c.style||"normal",this.weight=c.weight||"normal",this.stretch=c.stretch||"normal"}function i(){if(null===l){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}l=""!==a.style.font}return l}function j(a,b){return[a.style,a.weight,i()?a.stretch:"","100px",b].join(" ")}var k=null,l=null,m=null;h.prototype.load=function(a,e){var f=this,h=a||"BESbswy",i=e||3e3,l=(new Date).getTime();return new Promise(function(a,e){if(null===m&&(m=!!window.FontFace),m){var n=new Promise(function(a,b){function c(){(new Date).getTime()-l>=i?b():document.fonts.load(j(f,f.family),h).then(function(b){1<=b.length?a():setTimeout(c,25)},function(){b()})}c()}),o=new Promise(function(a,b){setTimeout(b,i)});Promise.race([o,n]).then(function(){a(f)},function(){e(f)})}else b(function(){function b(){var b;(b=-1!=q&&-1!=r||-1!=q&&-1!=s||-1!=r&&-1!=s)&&((b=q!=r&&q!=s&&r!=s)||(null===k&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),k=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=k&&(q==t&&r==t&&s==t||q==u&&r==u&&s==u||q==v&&r==v&&s==v)),b=!b),b&&(w.parentNode&&w.parentNode.removeChild(w),clearTimeout(x),a(f))}function m(){if((new Date).getTime()-l>=i)w.parentNode&&w.parentNode.removeChild(w),e(f);else{var a=document.hidden;!0!==a&&void 0!==a||(q=n.a.offsetWidth,r=o.a.offsetWidth,s=p.a.offsetWidth,b()),x=setTimeout(m,50)}}var n=new c(h),o=new c(h),p=new c(h),q=-1,r=-1,s=-1,t=-1,u=-1,v=-1,w=document.createElement("div"),x=0;w.dir="ltr",d(n,j(f,"sans-serif")),d(o,j(f,"serif")),d(p,j(f,"monospace")),w.appendChild(n.a),w.appendChild(o.a),w.appendChild(p.a),document.body.appendChild(w),t=n.a.offsetWidth,u=o.a.offsetWidth,v=p.a.offsetWidth,m(),g(n,function(a){q=a,b()}),d(n,j(f,'"'+f.family+'",sans-serif')),g(o,function(a){r=a,b()}),d(o,j(f,'"'+f.family+'",serif')),g(p,function(a){s=a,b()}),d(p,j(f,'"'+f.family+'",monospace'))})})},f=h}();var g={observe:function(a,b){for(var c=b.prefix,d=function(a){var b=a.weight?"-"+a.weight:"",d=a.style?"-"+a.style:"",e=a.className?"-"+a.className:"",g=a.className?"-"+a.className+b+d:"",h=document.getElementsByTagName("html")[0].classList,i=function(a){h.add(c+e+"-"+a),h.add(c+g+"-"+a)},j=function(a){h.remove(c+e+"-"+a),h.remove(c+g+"-"+a)};i("loading"),new f(a.familyName).load(a.testString).then(function(){i("ready"),j("loading")},function(){i("failed"),j("loading")})},e=0;e<a.length;e++)d(a[e])}},h={load:function(a){var b=document.createElement("link");b.href=a,b.media="all",b.rel="stylesheet",document.getElementsByTagName("head")[0].appendChild(b)},loadAsync:function(a){e(a)}},i={load:function(a){var b=document.createElement("script"),c=document.scripts[0];b.src=a,c.parentNode.appendChild(b)}};try{if(window.FontAwesomeCdnConfig){var j=window.FontAwesomeCdnConfig,k=j.useUrl,l=j.faCdnUrl,m=j.code,n="FontAwesome",o="fa",p="",q=d.bind(d,"fa"),r=function(){};j.autoA11y.enabled&&(a(q),c(q)),j.reporting.enabled&&b(j.reporting.domains,location.host)&&i.load(l+"/js/stats.js"),cssUrl="https://"+k+"/"+m+".css",new f(n).load(p).then(function(){var a=(window.FontAwesomeHooks||{}).loaded||r;a()},r),j.asyncLoading.enabled?h.loadAsync(cssUrl):h.load(cssUrl),g.observe([{familyName:n,testString:p}],{prefix:o+"-events-icons"})}}catch(s){}}();
