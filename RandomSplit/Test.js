function shuffle(l) {
    var list = l.filter(x => 1==1);
    for (var i = 0; i<list.length; i++){
        var s = Math.floor(Math.random()*list.length);
        var temp = list[s];
        list[s] = list[i];
        list[i] = temp;
    }
    return list;
}

function testShuffle() {
    var l = [0,1,2,3,4,5,6,7,8,9]
    var r = [0,0,0,0,0,0,0,0,0,0]
    for (var i = 0; i<10000000; i++){
        var tempList = shuffle(shuffle(shuffle(l)));
        for (var j = 0; j<l.length; j++){
            r[j] += tempList[j];
        }
    }
    console.log(r.map(x => x/10000000));
}
