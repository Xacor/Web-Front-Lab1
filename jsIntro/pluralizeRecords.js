'use strict'

function pluralizeRecords(n) {
    if (n % 10 == 1 && n % 100 != 11) {
        return `В результате выполнения запроса былa найденa ${n} запись`;
    }
    if (n % 10 > 1 && n % 10 < 5 && (n % 100 < 11 || n % 100 > 14)) {
        return `В результате выполнения запроса было найдено ${n} записи`;
    }
    else {
        return `В результате выполнения запроса было найдено ${n} записей`;
    }
}

console.log(pluralizeRecords(1));
console.log(pluralizeRecords(3));
console.log(pluralizeRecords(11));