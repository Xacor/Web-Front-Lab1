'use strict'

function fibb(n) {
    let cur = 1, prev = 0;
    for (let i = 1; i < n; i++) {
        cur += prev;
        prev = cur - prev;
        
    }

    return cur;
}

console.log(fibb(1000));