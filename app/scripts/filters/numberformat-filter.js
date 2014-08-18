'use strict';

angular.module('jayaMekarApp')

/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 * @link http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
 *
 */

.filter('numberFormat', function() {
    // Contoh penggunaan filter
    // numberFormat:"Rp ":0
    // number yaitu data yang akan dirubah formatnya
    // key yaitu jenis mata uangnya
    // LD (Long Desimal) yaitu jumlah desimal yang diinginkan
    return function(number, key, LD) {
    	// doc terlampir - Number.prototype.format(n, x, s, c)
        Number.prototype.format = function(n, x, s, c) { 
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                num = this.toFixed(Math.max(0, ~~n));

            return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
        };
        return key + number.format(LD, 3, '.', ',');
    };
});
