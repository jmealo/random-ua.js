random-ua.js - A random User-Agent Generator
============================================
Randomly generates User-Agent strings based on actual browser market share and usage statistics.

Caveats
-------
The version numbers generated are sane, however, revisions are totally random and unlikely to exist in the wild.

I decided not to include language selection found in the PHP version and instead include all the languages in the
[ISO639-2](http://www.loc.gov/standards/iso639-2/) standard because it's atypical for sites to determine client locale based on the user-agent.

Usage
-----
```js
var random_ua = require('random-ua');

console.log(random_ua.generate());
//Easy like Sunday morning

//You can easily use random_ua to generate a random User-Agent for an HTTP request:

var http = require('http');

http.get({
        host:'whatsmyuseragent.com',
        path:'/',
        headers:{
            'User-Agent':random_ua.generate()
        }
    },
    function (res) {
        if (res.statusCode === 200) {
            var body = [];
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', function () {
                body = body.join('');
                console.log(body);
            });
        } else {
            console.log('Error retrieving page: ' + res.statusCode);
        }
    }
);
```

Options
-------
Please send your suggestions for improvements or updates.

Based Upon
----------
This script is roughly based upon Luka Pusic's PHP script: http://360percents.com/posts/php-random-user-agent-generator/

A refactored version in PHP is available on GitHub at:
https://raw.github.com/mwhite/random-uagent/

License
-------
MIT License
