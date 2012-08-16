Node.js Random User Agent Generator
===================================
Randomly generates User-Agent strings based on actual usage statistics from Wikipedia and StatOwl.com as of July 2012.

Caveats
-------
The version numbers generated are sane, however, revisions are totally random and unlikely to exist in the wild.

Usage
-----
```js
var random_ua = require('random_ua'),
    http = require('http');

console.log(random_ua());
//Easy like Sunday morning

//use random_ua to generate a random User-Agent for an HTTP request

var random_ua = require('random-ua'),
    http = require('http');

console.log(random_ua.generate());
//Easy like Sunday morning

//use random_ua to generate a random User-Agent for an HTTP request

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
````

Options
-------
Please send your suggestions; I didn't need any options.

I decided not to include language selection found in the PHP version and instead include all the languages in the
[ISO639-2](http://www.loc.gov/standards/iso639-2/) standard because no sane site should use the User-Agent string
to determine client locale.

Based Upon
----------
This script is roughly based upon Luka Pusic's PHP script: http://360percents.com/posts/php-random-user-agent-generator/

A refactored version in PHP is available on GitHub at:
https://raw.github.com/mwhite/random-uagent/

License
-------
MIT License