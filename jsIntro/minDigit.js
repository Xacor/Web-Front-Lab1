'use strict'

function minDigit(x) {
    let min = 9;
    while (x > 0) {
        min = (x % 10) < min ? x % 10 : min;
        x = Math.trunc(x / 10);
    }

    return min;
}

// console.log(minDigit(567));