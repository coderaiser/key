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
            BACKSPACE   : 8,
            TAB         : 9,
            ENTER       : 13,
            ESC         : 27,
            
            SPACE       : 32,
            PAGE_UP     : 33,
            PAGE_DOWN   : 34,
            END         : 35,
            HOME        : 36,
            UP          : 38,
            DOWN        : 40,
            
            INSERT      : 45,
            DELETE      : 46,
            
            INSERT_MAC  : 96,
            
            ASTERISK    : 106,
            PLUS        : 107,
            MINUS       : 109,
            
            F1          : 112,
            F2          : 113,
            F3          : 114,
            F4          : 115,
            F5          : 116,
            F6          : 117,
            F7          : 118,
            F8          : 119,
            F9          : 120,
            F10         : 121,
            
            SLASH       : 191,
            TRA         : 192, /* Typewritten Reverse Apostrophe (`) */
            BACKSLASH   : 220
    };
    
    function key(str, event) {
        var right;
        
        check(str, event);
        
        right = str.split('|').some(function(combination) {
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
                    if (key.length === 1)
                        right = event.keyCode === key.charCodeAt(0);
                    else
                        Object.keys(KEY).some(function(name) {
                            var up = key.toUpperCase();
                            
                            if (up === name)
                                right = event.keyCode === KEY[name];
                        });
                    break;
                }
                
                return !right;
            });
            
            return !wrong;
        });
        
        return right;
    }
    
    function check(str, event) {
        if (typeof str !== 'string')
            throw(Error('str should be string!'));
        
        if (typeof event !== 'object')
            throw(Error('event should be object!'));
    }
    
})(this);
