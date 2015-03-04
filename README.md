Key
=======

Simple key parser.

## Install

`bower i key --save`

## Use

```js
    window.addEventListener('keydown', function(event) {
        if (key('Ctrl-A|Cmd-A', event)
            console.log('this is how key works');
    });
```

## License

MIT
