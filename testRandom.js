var tmpNum = 2;

/*
for(var i=0;i<50;i++) {
    tmpNum += Math.floor(Math.random() * tmpNum);
    if(tmpNum > 180) {
        tmpNum = tmpNum - Math.floor(tmpNum / 1.15);
    }
    console.log(tmpNum + "   :    " + Math.random());

}
*/

var random_percentage_val = 10;
for(var i=0;i<50;i++) {


    console.log(Math.random() < (random_percentage_val ? random_percentage_val / 100 : 0.5));
}


