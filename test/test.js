var random_ua = require('../random_ua.js');

var distribution = {mac: 0, lin: 0, win: 0, ie: 0, firefox: 0, opera: 0, chrome: 0, safari: 0};

var test_runs = 500000;

for(var x = 0; x < test_runs; x++) {
   var ua = random_ua.generate();
    //determine os
    if(ua.indexOf('NT ') !== -1) {
        distribution.win++;
    } else if(ua.indexOf('X11') !== -1) {
        distribution.lin++;
    } else {
        distribution.mac++;
    }

    //determine browser
    if(ua.indexOf('Firefox') !== -1) {
        distribution.firefox++;
    } else if(ua.indexOf('Chrome') !== -1) {
        distribution.chrome++;
    } else if(ua.indexOf('MSIE') !== -1) {
        distribution.ie++;
    } else if(ua.indexOf('Opera') !== -1) {
        distribution.opera++;
    } else {
        distribution.safari++;
    }
}

//Output distribution of O/S and browsers
for(prop in distribution) {
    console.log(prop + ': ' + (distribution[prop]/test_runs*100).toFixed(1) + '%');
}
