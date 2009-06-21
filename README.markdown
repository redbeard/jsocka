JSocka
======
Copyright (C) 2009 Kevin W. Gisi

JSocka is a library for stubbing methods and parameters in Javascript. It strives to replicate Mocha syntax, which in turn uses a JMock-like syntax. JSocka is designed to be test-framework-agnostic, though the test specs for the code itself are written in JSpec.

Getting Started
---------------
In order to start using JSocka, all you need to do is include the `lib/jsocka.js` Javascript file.

Here are some usage examples

    JSocka("Person").stubs("speak").returns("function(){alert('I love stubbing')});
    // Person.speak() now calls the stubbed function

    JSocka("Person").any_instance.stubs("speak").returns("function(){alert('I love stubbing')});
    // p = Person.new
    // p.speak() now calls the stubbed function

    JSocka("Person").expects("speak");

    JSocka("Person").expects("speak").never();

    JSocka("Person").expects("speak").returns("function(){alert('I love stubbing')});

    JSocka("Person").expects("speak").with("Dignity").returns("function(){alert('I am the very model of a modern major general.')})

    JSocka.destub();
    // This clears out all existing stubs, and resets the original functions

Usage Notes
-----------
Please note that every JSocka method is a function, not a parameter. While Mocha does support some syntax like `Person.expects(method).once`, there's not a way to implement this in Javascript. Everything needs parentheses!

Expectations are destructive (Adding hook code with chaining doesn't work for base classes). Be aware that `JSocka("Person").expects("speak")` will keep track of how many times the `Person.speak` method is called, but `Person.speak` will not return anything unless you explicitly define it, i.e. `JSocka("Person").expects("speak").returns("function(){ // code}")`

Recently Added (Read: Tested, but not thoroughly) Features
----------------------------------------------------------
* Times conditions on expectations
* With conditions on expectations

On the Horizon
--------------
* Finishing implementation for "expects"
* Creating matchers for JSpec to allow `Person.stubs("speak").returns("function(){}")`

Comments & Suggestions
----------------------
Please feel free to contact me with questions or suggestions at kevin.gisi@gmail.com
