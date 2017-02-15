/**
 * Created by chaclus on 2016/12/15.
 */

/**
 * 生成器是一种可以从中退出之后重新进入的函数。生成器的环境（绑定的变量）会在每次执行后保存，下次进入时可以继续使用
 */
function* idMaker() {
    var index = 0;
    while(index < 3) {
        yield index++;
    }
}


var gen = idMaker();
console.log("gen....", gen);

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);


function* anotherGenerator(i) {
    yield i + 1;
    yield i + 2;
    yield i + 3;
}
function* generator (i) {
    yield i;
    yield* anotherGenerator(i);
    yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);