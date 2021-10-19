'use strict'

function gcd(a, b) {
	if (b > a) return gcd(b, a);

	if (!b) return a;

	return gcd(b, a % b);
}

// console.log(gcd(64, 48));