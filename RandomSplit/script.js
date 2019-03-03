function onApply() {
    var ammount = Math.max(Math.min(document.getElementById('ammountOfLines').value,99),2);
    console.log(ammount);
    var html = ''
    for(var i = 0; i<ammount; i++){
        html += '<label>Name ' + (i+1) + ' <input id="name' + (i+1) + '" type="text"></label><br>'
    }
    html += '<label>Split into <input id="categories" type="number" value="1" max="' + Math.ceil(ammount/2) + '" min="1"> categories</label> <button onclick="split()">Apply</button>'
    document.getElementById('container').innerHTML = html;
    document.getElementById('container').hidden = false;
    document.getElementById('conclusion').hidden = true;
}

function split() {
    var html = ''
    var list = [];
    var count = (document.getElementById('container').childElementCount - 2)/2;
    var categories = document.getElementById('categories').value;
    for (var i = 0; i<count; i++){
        var name = document.getElementById("name" + (i+1)).value;
        list.push(name);
    }
    shuffle(list);
    console.log(list);
    var listlist = [];
    html += '<table><tbody>'
    for (var i = 0; i<categories; i++){
        var l = subSplit(list,(categories-i))
        listlist.push(l);
        html += '<tr><td> TEAM ' + (i+1) + '</td>'
        for (var j = 0; j<l.length; j++) {
            html += '<td>' + l[j] + '</td>';
        }
        html += '</tr>'
    }
    html += '</tbody></table>'
    console.log(html);
    document.getElementById('conclusion').innerHTML = html;
    document.getElementById('conclusion').hidden = false;
}

function shuffle(list) {
    for (var i = 0; i<list.length; i++){
        var s = Math.floor(Math.random()*i);
        var temp = list[s];
        list[s] = list[i];
        list[i] = temp;
    }
}

function subSplit(list, groups) {
    var perGroup = Math.ceil(list.length/groups);
    return list.splice(0,perGroup);
}

window.onload = function() {
    //var content = document.getElementById('string')
}
