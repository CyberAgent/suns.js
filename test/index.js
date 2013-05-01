(function (global) {

    var suns = require('../suns');

    var should = require('should');

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

    describe('suns existence', function () {
        it('is an object', function () {
            suns.should.be.a('object');
        });
    });

    describe('normal extending', function () {
        var Child = suns.extend(Base, {
            childfunc1: function childfunc1() {
                return 'this is childfunc1';
            },

            /**
             * @override
             */
            func2: function func2() {
                return 'this is overriden func2';
            }
        });

        var c = new Child();

        it('should have parent property', function () {
            c.should.have.property('func1');
            c.func1().should.be.equal('this is func1');
        });

        it('should have child property', function () {
            c.should.have.property('childfunc1');
            c.childfunc1().should.be.equal('this is childfunc1');
        });

        it('should override parents function', function () {
            c.should.have.property('func2');
            c.func2().should.be.equal('this is overriden func2');
        });

        it('should be able to call parents function', function () {
            c.should.have.property('func2');
            Child.__super__.func2.call(c).should.be.equal('this is func2');
        });

    });


    describe('normal extending with function name', function () {
        var Child = suns.extend(
            'Child',
            Base, {
            childfunc1: function childfunc1() {
                return 'this is childfunc1';
            },

            /**
             * @override
             */
            func2: function func2() {
                return 'this is overriden func2';
            }
        });

        var c = new Child();

        it('should have parent property', function () {
            c.should.have.property('func1');
            c.func1().should.be.equal('this is func1');
        });

        it('should have child property', function () {
            c.should.have.property('childfunc1');
            c.childfunc1().should.be.equal('this is childfunc1');
        });

        it('should override parents function', function () {
            c.should.have.property('func2');
            c.func2().should.be.equal('this is overriden func2');
        });

        it('should be able to call parents function', function () {
            c.should.have.property('func2');
            Child.__super__.func2.call(c).should.be.equal('this is func2');
        });

    });


    describe('multiple extending', function () {
        var Child = suns.extend(
            Base,
            {
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
            {
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

        var c = new Child();

        it('should have parent property', function () {
            c.should.have.property('func1');
            c.func1().should.be.equal('this is func1');
        });

        it('should have child property', function () {
            c.should.have.property('childfunc1');
            c.should.have.property('childchildfunc1');
            c.childfunc1().should.be.equal('this is childfunc1');
            c.childchildfunc1().should.be.equal('this is childchildfunc1');
        });


        it('should override parents function', function () {
            c.should.have.property('func2');
            c.func2().should.be.equal('this is overoverriden func2');
        });

        it('should be able to call parents function', function () {
            Child.__super__.should.have.property('func2');
            Child.__super__.func2.call(c).should.be.equal('this is overriden func2');
        });

        it('should be able to call parents function', function () {

            Child.__super__.should.have.property('func2');
            Child.__supersuper__.func2.call(c).should.be.equal('this is func2');
        });

        it('should have parents static property', function() {
            Child.should.have.property('staticProp');
            Child.staticProp.should.be.equal('BaseStaticProp');
        });

    });


    describe('multiple extending with name', function () {
        var Child = suns.extend(
            'Child',
            Base,
            {
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
            {
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

        var c = new Child();

        it('should have parent property', function () {
            c.should.have.property('func1');
            c.func1().should.be.equal('this is func1');
        });

        it('should have child property', function () {
            c.should.have.property('childfunc1');
            c.should.have.property('childchildfunc1');
            c.childfunc1().should.be.equal('this is childfunc1');
            c.childchildfunc1().should.be.equal('this is childchildfunc1');
        });


        it('should override parents function', function () {
            c.should.have.property('func2');
            c.func2().should.be.equal('this is overoverriden func2');
        });

        it('should be able to call parents function', function () {
            Child.__super__.should.have.property('func2');
            Child.__super__.func2.call(c).should.be.equal('this is overriden func2');
        });

        it('should be able to call parents function', function () {

            Child.__super__.should.have.property('func2');
            Child.__supersuper__.func2.call(c).should.be.equal('this is func2');
        });

    });


    describe('constructor overriding', function() {

        var HasConstructor = suns.extend(
            'HasConstructor',
            Base,
            {
                constructor: function HasConstructor(name) {
                    console.log(JSON.stringify(HasConstructor));
                    HasConstructor.__superCtor__.apply(this, arguments);

                    this.name2 = name;
                }
            }
        );
        var hc = new HasConstructor('hasConstructor name');


        it('should have property that parents initialized', function() {
            hc.name.should.be.equal('this is base class');
        });

        it('should have property that child initialized', function() {
            hc.name2.should.be.equal('hasConstructor name');
        });

    });


    describe('mix-in(not prototype object) extending', function() {

        var Base = function Base() {
            console.log('base ctor');
            this.base = 'base';
        };

        Base.prototype = {
            getBase: function getBase() {
                return this.base;
            }
        };

        var Another = function Another() {
            console.log('another ctor');
            this.another = 'another';
        };

        Another.prototype = {
            getAnother: function getAnother() {
                return this.another;
            }
        };

        var Mixed = suns.mixin(
            'Mixed',
            Base,
            Another,
            {
                constructor: function Mixed() {
                    Mixed.__superCtor__.apply(this, arguments);
                    console.log('mixed ctor');
                    this.mixed = 'mixed';
                },

                getMixed: function getMixed() {
                    return this.mixed;
                }
            }
        );

        var mixed = new Mixed();


        it('should have property that base initialized', function() {
            mixed.base.should.be.equal('base');
        });

        it('should have property that another initialized', function() {
            mixed.another.should.be.equal('another');
        });

        it('should have property that mixed initialized', function() {
            mixed.mixed.should.be.equal('mixed');
        });

    });

})(this);
