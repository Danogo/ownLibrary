//My own library project. Library creates usable greeting.
//Wrapping whole function in IIFE to not interfere with another scripts
(function (global, $) {//setting parameters for this IIFE
  var Greetr = function(firstname, lastname, language) { // Function returning function constructor to prevent from using 'new' keyword all the time
    return new Greetr.init(firstname, lastname, language);//returning new object created via function constructor
  };

  //Data available to greetr object methods via closures, not accessible from the global object
  var supportedLanguages = ['en', 'de', 'pl'];

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

  // object which includes all properties and methods
  Greetr.prototype = {

    fullName: function() {
      return this.firstname + ' ' + this.lastname; //'this' keyword refers to the calling object
    },
    greeting: function() {
      return greetings[this.language] + ' ' + this.firstname + '!';
    },
    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },
    greet: function(formal) {
      if (formal) { //null or undefined coerces to false
        return this.formalGreeting();
      } else {
        return this.greeting();
      }
    },
    validate: function() {
      if(supportedLanguages.indexOf(this.language) === -1) {
        throw new Error('Provided language is not supported');
      } else {
        console.log('Provided language is valid');
      }
    },
    setLang: function(lang) {
      this.language = lang;
      this.validate();
      return this//returning 'this' keyword gives back calling object and it makes method chainable
    },
    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }
    }
  };



  Greetr.init = function(firstname, lastname, language) {//funtion constructor for new created objects
    var self = this;//prevents 'this' keyword from pointing at global object during execution context
    self.firstname = firstname || '';//'self' refers to the calling object during execution context
    self.lastname = lastname || '';
    self.language = language || 'en';
  };

//Every new created object's prototype is prototype method(not __proto__ of this function!) of function which created him
  Greetr.init.prototype = Greetr.prototype; //overwriting prototype method of function constructor with our object with methods and properites we want new created object to have acces to
  global.Greetr = global.G$ = Greetr; //exposing our function to global object, window in this case
}( window, jQuery));
