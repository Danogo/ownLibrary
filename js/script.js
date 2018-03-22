//creating Greetr object
var grDan = G$('Daniel', 'Ogonowski');

//adding click event to login button
$('#login').on('click', function() {
  //setting language depending on chosen language, then injecting greeting to the element with 'greeting' class
  grDan.setLang($('#lang').val()).jQGreet('.greeting', true);
});
