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
        document.getElementById("edit").style.display = "none";
        list.splice(i, 1);
        document.getElementById('edit').style.display = 'none';
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
      if ((!/[0-9]/.test(c)) && (c != '-') && (c != '+') && (c != '(') && (c != ')') && (c != ' ')){
        phoneOK = false
        break;
      }
    }
  }
  if (email.length>5) {
    var s = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailOK = s.test(email);
  }
  if (!phoneOK && phone.length >=1){alert("invalid Phone number");return false;}
  if (!emailOK && email.length >=1){alert("invalid Email");return false;}
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
