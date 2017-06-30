var $ = require('zepto');

exports.say = function(word) {
    console.log(word);
};

exports.run = function() {
    console.log($);
    console.log('running X');
};
