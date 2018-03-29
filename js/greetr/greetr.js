// My own library project based on Anthony Alicea's tutorials. It's a library which creates usable greeting.

// wrapping whole function in IIFE to not interfere with another scripts
// and setting parameters for this IIFE
(function (global, $) {
  // function returning result of invoking function constructor to prevent from using 'new' keyword every time we create object
  var Greetr = function(firstname, lastname, language) {
    // returning new object created via function constructor
    return new Greetr.init(firstname, lastname, language);
  };

  //Data available to greetr object methods within the closure, not accessible from the global object because is hidden in IIFE
  var supportedLanguages = ['en', 'de', 'pl'];
  //Basic greetings
  var greetings = {
    en: 'Hello',
    de: 'Hallo',
    pl: 'Cześć'
  };

  var formalGreetings = {
    en: 'Good morning',
    de: 'Guten Tag',
    pl: 'Dzień dobry'
  };

  var logMessages = {
    en: 'Logged in',
    de: 'Eingeloggt',
    pl: 'Zalogowany'
  };

  // Greetr.prototype holds all properties and methods instead of function constructor to save memory space
  Greetr.prototype = {

    fullName: function() {
      //'this' keyword refers to the calling object
      return this.firstname + ' ' + this.lastname;
    },

    greeting: function() {
      //retrieving greeting string using bracket notation
      return greetings[this.language] + ' ' + this.firstname + '!';
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },

    greet: function(formal) {
      //null or undefined coerces to false
      if (formal) {
        return this.formalGreeting();
      } else {
        return this.greeting();
      }
    },

    validate: function() {
      //check if passed in language is valid
      if(supportedLanguages.indexOf(this.language) === -1) {
        throw new Error('Provided language is not supported');
      } else {
        console.log('Provided language is supported');
      }
    },

    setLang: function(lang) {
      this.language = lang;
      this.validate();
      //returning 'this' keyword gives back calling object and it makes method chainable
      return this
    },

    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }
      return this;
    },

    jQGreet: function(selector, formal) {
      formal = formal || false;
      var msg;
      msg = this.greet(formal);
      $(selector).html(msg);
      return this;
    }
  };
  //TODO add lang as a parameter in jqGreeting and remove DOM selector from this method

  //Creating an object with function constructor
  Greetr.init = function(firstname, lastname, language) {
    //trick which prevents 'this' keyword from pointing at global object during execution context
    var self = this;
    //'self' refers to the calling object during execution context
    self.firstname = firstname || '';
    self.lastname = lastname || '';
    self.language = language || 'en';
    //checking if passed in argument for language is valid
    self.validate();
  };

  //Every new created object's prototype is 'prototype' property of function which created him
  //This prototype property which every declared function has is empty object at the beginning. 
  //It waits for using that function as a function constructor to point new created object's prototype to this property. 
  //It is not __proto__ of this function!

  // Here we're overwriting prototype property of function constructor with our object with methods and properites we want new created object to have acces to
  Greetr.init.prototype = Greetr.prototype;

  //exposing our function to global object, window in this case
  global.Greetr = global.G$ = Greetr;
}( window, jQuery)); //end of IIFE
