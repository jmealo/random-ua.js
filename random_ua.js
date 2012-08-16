function randomBrowserAndOS() {
    var browser, os, rand = Math.floor(Math.random() * 101);

    //Randomly select a browser according to usage statistics
    if (rand <= 34) {
        browser = 'chrome';
    } else if (rand <= 62 && rand > 34) {
        return ['iexplorer', 'win']; //we don't need to randomly choose an O/S for IE...
    } else if (rand <= 87 && rand > 62) {
        browser = 'firefox';
    } else if (rand <= 94 && rand > 87) {
        browser = 'safari';
    } else {
        browser = 'opera';
    }

    rand = Math.floor(Math.random() * 101);

    var os_list = ['win', 'mac', 'lin'];

    //randomly choose an O/S the browser runs on according to usage stats
    var browser_os = {
        'chrome':[89, 9, 2],
        'firefox':[83, 16, 1],
        'safari':[4, 96],
        'opera':[91, 3, 6]
    }

    var os_freq = browser_os[browser];

    if (rand <= os_freq[0]) {
        os = os_list[0];
    } else if (rand <= os_freq[1] + os_freq[0]) {
        os = os_list[1];
    } else {
        os = os_list[2];
    }

    return [browser, os];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomLang() {
    var languages = ['AB', 'AF', 'AN', 'AR', 'AS', 'AZ', 'BE', 'BG', 'BN', 'BO', 'BR', 'BS', 'CA', 'CE', 'CO', 'CS',
        'CU', 'CY', 'DA', 'DE', 'EL', 'EN', 'EO', 'ES', 'ET', 'EU', 'FA', 'FI', 'FJ', 'FO', 'FR', 'FY',
        'GA', 'GD', 'GL', 'GV', 'HE', 'HI', 'HR', 'HT', 'HU', 'HY', 'ID', 'IS', 'IT', 'JA', 'JV', 'KA',
        'KG', 'KO', 'KU', 'KW', 'KY', 'LA', 'LB', 'LI', 'LN', 'LT', 'LV', 'MG', 'MK', 'MN', 'MO', 'MS',
        'MT', 'MY', 'NB', 'NE', 'NL', 'NN', 'NO', 'OC', 'PL', 'PT', 'RM', 'RO', 'RU', 'SC', 'SE', 'SK',
        'SL', 'SO', 'SQ', 'SR', 'SV', 'SW', 'TK', 'TR', 'TY', 'UK', 'UR', 'UZ', 'VI', 'VO', 'YI', 'ZH'];
    return languages[getRandomInt(0, 95)];
}

function randomProc(arch) {
    var procs = {
        lin:['i686', 'x86_64'],
        mac:['Intel', 'PPC', 'U; Intel', 'U; PPC'],
        win:['', 'WOW64', 'Win64; x64']
    };
    return getRandom(procs[arch]);
}

function getRandom(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}

function random_revision(dots) {
    var return_val = '';
    //generate a random revision, if passed 2, return value will be .0.1 with 0 and 1 being random numbers betweeen 1-9
    for (var x = 0; x < dots; x++) {
        return_val += '.' + getRandomInt(0, 9);
    }
    return return_val;
}

var version_string = {
    net:function () {
        return getRandomInt(1, 4) + '.' + getRandomInt(0, 9) + '.' + getRandomInt(10000, 99999) + '.' + getRandomInt(0, 9);
    },
    nt:function () {
        return getRandomInt(5, 6) + '.' + getRandomInt(0, 2);
    },
    ie:function () {
        return getRandomInt(7, 10) + '.0';
    },
    trident:function () {
        return getRandomInt(3, 5) + '.' + getRandomInt(0, 1);
    },
    osx:function (delim) {
        if (delim === undefined) {
            delim = '.';
        }
        return '10' + delim + getRandomInt(5, 8) + delim + getRandomInt(0, 9);
    },
    chrome:function () {
        return getRandomInt(13, 15) + '.0.' + getRandomInt(800, 899) + '.0';
    },
    presto:function () {
        return '2.9.' + getRandomInt(160, 190);
    },
    presto2:function () {
        return getRandomInt(10, 12) + '.00';
    }
}

var browser = {
    firefox:function firefox(arch) {
        //https://developer.mozilla.org/en-US/docs/Gecko_user_agent_string_reference
        var firefox_ver = getRandomInt(5, 15) + random_revision(2);

        var gecko_ver = 'Gecko/20100101 Firefox/' + firefox_ver;

        var os_ver = '';
        if (arch == 'win') {
            var proc = randomProc(arch);
            os_ver = '(Windows NT ' + version_string.nt() + ((proc !== '') ? '; ' + proc : '') + '; ';
        } else if (arch == 'mac') {
            os_ver = '(Macintosh; ' + randomProc(arch) + ' Mac OS X ' + version_string.osx();
        } else {
            os_ver = '(X11; Linux ' + randomProc(arch);
        }

        return 'Mozilla/5.0 ' + os_ver + '; rv:' + firefox_ver.slice(0, -2) + ') ' + gecko_ver;
    },

    iexplorer:function iexplorer() {
        return 'Mozilla/5.0 (compatible; MSIE ' + version_string.ie() + '; Windows NT ' + version_string.nt() + '; Trident/' +
            version_string.trident() + ((getRandomInt(0, 1) == 1) ? '; .NET CLR ' + version_string.net() : '') + ')';
    },

    opera:function opera(arch) {

        var presto_ver = ' Presto/' + version_string.presto() + ' Version/' + version_string.presto2() + ')';
        var os_ver = '';

        if (arch == 'win') {
            os_ver = '(Windows NT ' + version_string.nt() + '; U; ' + randomLang() + presto_ver;
        } else if (arch == 'lin') {
            os_ver = '(X11; Linux ' + randomProc('lin') + '; U; ' + randomLang() + presto_ver;
        } else {
            os_ver = '(Macintosh; Intel Mac OS X ' + version_string.osx() + ' U; ' + randomLang() + ' Presto/' +
                version_string.presto() + ' Version/' + version_string.presto2() + ')';

        }
        return 'Opera/' + getRandomInt(9, 12) + '.' + getRandomInt(0, 99) + ' ' + os_ver;
    },

    safari:function safari(arch) {
        var safari = getRandomInt(531, 536) + '.' + getRandomInt(1, 50) + '.' + getRandomInt(1, 7);
        var ver = getRandomInt(4, 5) + '.' + (getRandomInt(0, 1) == 0) ? '0.' + getRandomInt(1, 5) : getRandomInt(0, 1);

        var os_ver = '';

        if (arch == 'mac') {
            os_ver = '(Macintosh; ' + randomProc('mac') + ' Mac OS X ' + version_string.osx('_') + ' rv:' +
                getRandomInt(2, 6) + '.0; ' + randomLang() + ') ';
        } else {
            os_ver = '(Windows; U; Windows NT ' + version_string.nt() + ')';
        }

        return 'Mozilla/5.0 ' + os_ver + 'AppleWebKit/' + safari + ' (KHTML, like Gecko) Version/' + ver + ' Safari/' + safari;
    },

    chrome:function chrome(arch) {

        var safari = getRandomInt(531, 536) + '.' + getRandomInt(0, 2);
        var ver = getRandomInt(4, 5) + '.' + (getRandomInt(0, 1) == 0) ? '0.' + getRandomInt(1, 5) : getRandomInt(0, 1);

        var os_ver = '';

        if (arch == 'mac') {
            os_ver = '(Macintosh; ' + randomProc('mac') + ' Mac OS X ' + version_string.osx('_') + ') ';
        } else if (arch == 'win') {
            os_ver = '(Windows; U; Windows NT ' + version_string.nt() + ')';
        } else {
            os_ver = '(X11; Linux ' + randomProc('lin');
        }

        return 'Mozilla/5.0 ' + os_ver + ' AppleWebKit/' + safari + ' (KHTML, like Gecko) Chrome/' +
            version_string.chrome() + ' Safari/' + safari;
    }}

exports.generate = function generate() {
    var random = randomBrowserAndOS();
    return browser[random[0]](random[1]);
}
