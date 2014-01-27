suns.js
========

Object extending utilities for node and the browser (amd support)

# Build

dependence) `node.js`

`$ npm install .`

`$ make`

# Simple Example

```javascript

//
// base class
//
var Base = function() {
    this.name = 'this is base class';
};
Base.prototype = {
    func1: function func1() {
        return 'this is func1';
    },

    func2: function func2() {
        return 'this is func2';
    },

    func3: function func3() {
        return 'this is func3';
    }
};

Base.staticProp = 'BaseStaticProp';


//
// make child class
//
var Child = suns.extend(
    'Child', // for convenience to debug (easy-to-read stack trace)
    Base,
    {// prototype

        childfunc1: function childfunc1() {
            return 'this is childfunc1';
        },

        /**
         * @override
         */
        func2: function func2() {
            return 'this is overriden func2';
        }
    }
);
var c = new Child();
c.func1();                          // 'this is func1'
c.childfunc1();                     // 'this is childfunc1'
c.func2();                          // 'this is overriden func2'
Child.__supersuper__.func2.call(c); // 'this is func2'


//
// child class extends two prototypes
//
var GrandChild = suns.extend(
    'GrandChild', // for convenience to debug (easy-to-read stack trace)
    Base,
    {// prototype1

        childfunc1: function childfunc1() {
            return 'this is childfunc1';
        },

        /**
         * @override
         */
        func2: function func2() {
            return 'this is overriden func2';
        }
    },
    {// prototype2
        childchildfunc1: function childchildfunc1() {
            return 'this is childchildfunc1';
        },

        /**
         * @override
         */
        func2: function func2() {
            return 'this is overoverriden func2';
        },

        /**
         * @override
         */
        func3: function func3() {
            return 'this is overriden func3';
        }
    }
);

var gc = new GrandChild();
gc.func1();                               // 'this is func1'
gc.childfunc1();                          // 'this is childfunc1'
gc.func2();                               // 'this is overoverriden func2'
GrandChild.__super__.func2.call(gc);      // 'this is overriden func2'
GrandChild.__supersuper__.func2.call(gc); // 'this is func2'

```

# AUTHORS

## Kei FUNAGAYAMA

* [https://github.com/fkei](https://github.com/fkei)
* [https://twitter.com/fkei](https://twitter.com/fkei)

## Kazuma MISHIMAGI

* [https://github.com/maginemu](https://github.com/maginemu)
* [https://twitter.com/maginemu](https://twitter.com/maginemu)


## CyberAgent Publicity

* [infosys_oss@cyberagent.co.jp](mailto:infosys_oss@cyberagent.co.jp)

# Changelog

@see https://github.com/CyberAgent/suns.js/blob/master/Changelog

# Copyright

CyberAgent, Inc. All rights reserved.

# License

MIT @see https://github.com/CyberAgent/suns.js/blob/master/LICENSE


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/CyberAgent/suns.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

