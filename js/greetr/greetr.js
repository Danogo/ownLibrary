//My own labrary project. Library creates usable greeting
//Wrapping whole function in IIFE to not interfere with another scripts
(function (global, $) {//setting parameters for this IIFE
  var Greetr = function(firstname, lastname, language) { // Function returning function constructor to prevent from using new keyword all the time
    return new Greetr.init(firstname, lastname, language);//returning new object created via function constructor
  };

  Greetr.prototype = {}; //empty object to hold all properties and methods

  Greetr.init = function(firstname, lastname, language) {
    var self = this;
    self.firstname = firstname || 'Daniel';
    self.lastname = lastname || 'Ogonowski';
    self.langauge = language || 'english';
  };

  Greetr.init.prototype = Greetr.prototype;
  global.Greetr = global.G$ = Greetr;
}( window, jQuery));
