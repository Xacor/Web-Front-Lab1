'use strict'

function pow(x, n) {
    let res = 1;
    for (let i = 0; i < n; i++) {
        res *= x;
    }

    return res;
}

// console.log(pow(2, 2));