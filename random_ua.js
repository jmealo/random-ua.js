function randomBrowserAndOS() {
    var browser, os, rand = Math.floor(Math.random() * 101);

    //Randomly select a browser according to usage statistics

    browser = (rand <= 34) ? 'chrome'
            : (rand <= 87 && rand > 62) ? 'firefox'
            : (rand <= 94 && rand > 87) ? 'safari'
            : 'opera';

    if(rand <= 62 && rand > 34) return ['iexplorer', 'win']; //Skip IE:Mac

    rand = Math.floor(Math.random() * 101);

    var os_list = ['win', 'mac', 'lin'];

    //randomly choose an O/S the browser runs on according to usage stats
    var browser_os = {
        chrome: [89, 9 , 2],
        firefox:[83, 16, 1],
        safari: [4 , 96],
        opera:  [91, 3 , 6]
    }

    var os_freq = browser_os[browser];

    os = (rand <= os_freq[0]) ? os_list[0]
       : (rand <= os_freq[1] + os_freq[0]) ?os_list[1]
       : os_list[2];

    return [browser, os];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomLang() {
    var languages = ['AB', 'AF', 'AN', 'AR', 'AS', 'AZ', 'BE', 'BG', 'BN', 'BO', 'BR', 'BS', 'CA', 'CE', 'CO', 'CS',
                     'CU', 'CY', 'DA', 'DE', 'EL', 'EN', 'EO', 'ES', 'ET', 'EU', 'FA', 'FI', 'FJ', 'FO', 'FR', 'FY',
                     'GA', 'GD', 'GL', 'GV', 'HE', 'HI', 'HR', 'HT', 'HU', 'HY', 'ID', 'IS', 'IT', 'JA', 'JV', 'KA',
                     'KG', 'KO', 'KU', 'KW', 'KY', 'LA', 'LB', 'LI', 'LN', 'LT', 'LV', 'MG', 'MK', 'MN', 'MO', 'MS',
                     'MT', 'MY', 'NB', 'NE', 'NL', 'NN', 'NO', 'OC', 'PL', 'PT', 'RM', 'RO', 'RU', 'SC', 'SE', 'SK',
                     'SL', 'SO', 'SQ', 'SR', 'SV', 'SW', 'TK', 'TR', 'TY', 'UK', 'UR', 'UZ', 'VI', 'VO', 'YI', 'ZH'];
    return languages[randomInt(0, 95)];
}

function randomProc(arch) {
    var procs = {
        lin:['i686', 'x86_64'],
        mac:['Intel', 'PPC', 'U; Intel', 'U; PPC'],
        win:['', 'WOW64', 'Win64; x64']
    }
    return getRandom(procs[arch]);
}

function getRandom(arr) {
    return arr[randomInt(0, arr.length - 1)];
}

function randomRevision(dots) {
    var return_val = '';
    //generate a random revision
    //dots = 2 returns .x.y where x & y are between 0 and 9
    for (var x = 0; x < dots; x++) {
        return_val += '.' + randomInt(0, 9);
    }
    return return_val;
}

var version_string = {
    net: function () {
        return [randomInt(1, 4), randomInt(0, 9), randomInt(10000, 99999), randomInt(0, 9)].join('.');
    },
    nt: function () {
        return randomInt(5, 6) + '.' + randomInt(0, 2);
    },
    ie: function () {
        return randomInt(7, 10) + '.0';
    },
    trident: function () {
        return randomInt(3, 5) + '.' + randomInt(0, 1);
    },
    osx: function (delim) {
        return [10, randomInt(5, 8), randomInt(0, 9)].join(delim || '.');
    },
    chrome: function () {
        return [randomInt(13, 15), 0, randomInt(800, 899), 0].join('.');
    },
    presto: function () {
        return '2.9.' + randomInt(160, 190);
    },
    presto2: function () {
        return randomInt(10, 12) + '.00';
    }
}

var browser = {
    firefox: function firefox(arch) {
        //https://developer.mozilla.org/en-US/docs/Gecko_user_agent_string_reference
        var firefox_ver = randomInt(5, 15) + randomRevision(2);

        var gecko_ver = 'Gecko/20100101 Firefox/' + firefox_ver;

        var proc = randomProc(arch), os_ver = '';

        os_ver = (arch === 'win') ? '(Windows NT ' + version_string.nt() + ((proc) ? '; ' + proc : '') 
               : (arch === 'mac') ? '(Macintosh; ' + proc + ' Mac OS X ' + version_string.osx()
               : '(X11; Linux ' + proc;

        return 'Mozilla/5.0 ' + os_ver + '; rv:' + firefox_ver.slice(0, -2) + ') ' + gecko_ver;
    },

    iexplorer: function iexplorer() {
        return 'Mozilla/5.0 (compatible; MSIE ' + version_string.ie() + '; Windows NT ' + version_string.nt() + '; Trident/' +
            version_string.trident() + ((randomInt(0, 1) === 1) ? '; .NET CLR ' + version_string.net() : '') + ')';
    },

    opera:function opera(arch) {
        var presto_ver = ' Presto/' + version_string.presto() + ' Version/' + version_string.presto2() + ')';

        var os_ver = (arch === 'win') ? '(Windows NT ' + version_string.nt() + '; U; ' + randomLang() + presto_ver 
                   : (arch === 'lin') ? '(X11; Linux ' + randomProc(arch) + '; U; ' + randomLang() + presto_ver
                   : '(Macintosh; Intel Mac OS X ' + version_string.osx() + ' U; ' + randomLang() + ' Presto/' +
                      version_string.presto() + ' Version/' + version_string.presto2() + ')';

        return 'Opera/' + randomInt(9, 12) + '.' + randomInt(0, 99) + ' ' + os_ver;
    },

    safari:function safari(arch) {
        var safari = randomInt(531, 536) + '.' + randomInt(1, 50) + '.' + randomInt(1, 7);
        var ver = randomInt(4, 5) + '.' + (randomInt(0, 1) === 0) ? '0.' + randomInt(1, 5) : randomInt(0, 1);

        var os_ver = (arch === 'mac') ? '(Macintosh; ' + randomProc('mac') + ' Mac OS X '+ version_string.osx('_') + ' rv:' + randomInt(2, 6) + '.0; '+ randomLang() + ') '
                   : '(Windows; U; Windows NT ' + version_string.nt() + ')';

        return 'Mozilla/5.0 ' + os_ver + 'AppleWebKit/' + safari + ' (KHTML, like Gecko) Version/' + ver + ' Safari/' + safari;
    },

    chrome:function chrome(arch) {

        var safari = randomInt(531, 536) + '.' + randomInt(0, 2);
        var ver = randomInt(4, 5) + '.' + (randomInt(0, 1) === 0) ? '0.' + randomInt(1, 5) : randomInt(0, 1);

        var os_ver = (arch === 'mac') ? '(Macintosh; ' + randomProc('mac') + ' Mac OS X ' + version_string.osx('_') + ') '
                   : (arch === 'win') ? '(Windows; U; Windows NT ' + version_string.nt() + ')'
                   : '(X11; Linux ' + randomProc(arch);

        return 'Mozilla/5.0 ' + os_ver + ' AppleWebKit/' + safari + ' (KHTML, like Gecko) Chrome/' + version_string.chrome() + ' Safari/' + safari;
    }}

exports.generate = function generate() {
    var random = randomBrowserAndOS();
    return browser[random[0]](random[1]);
}
