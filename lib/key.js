(function(global) {
    'use strict';
    
    /* global define */
    
    if (typeof module !== 'undefined' && module.exports)
        module.exports.key  = key;
    else if (typeof define === 'function' && define.amd)
        define('key', [], function() {
            return key;
        });
    else
        global.key          = key;
    
    var KEY = {
        TAB     : 9,
        ENTER   : 13,
        ESC     : 27
    };
    
    function key(str, el, callback) {
        if (!callback) {
            callback    = el;
            el          = window;
        }
        
        check(str, callback);
        
        el.addEventListener('keydown', function(event) {
            str.split('|').forEach(function(combination) {
                var wrong;
                
                wrong = combination.split('-').some(function(key) {
                    var right;
                    
                    switch(key) {
                    case 'Ctrl':
                        right = event.ctrlKey;
                        break;
                    
                    case 'Shift':
                        right = event.shiftKey;
                        break;
                    
                    case 'Alt':
                        right = event.altKey;
                        break;
                    
                    case 'Cmd':
                        right = event.metaKey;
                        break;
                    
                    default:
                        right = event.keyCode === key.charCodeAt(0);
                        break;
                    }
                    
                    if (!right)
                        Object.keys(KEY).some(function(name) {
                            var up = key.toUpperCase();
                            
                            if (up === name)
                                right = event.keyCode === KEY[name];
                        });
                    
                    return !right;
                });
                
                if (!wrong)
                    callback(event);
            });
        });
    }
    
    function check(str, callback) {
        if (typeof str !== 'string')
            throw(Error('str should be string!'));
        
        if (typeof callback !== 'function')
            throw(Error('callback should be function!'));
    }
    
})(this);
