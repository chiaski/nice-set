

// Get the hash of the url
const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;


// Make a call using the token
$.ajax({
   url: "https://api.spotify.com/v1/me/top/artists",
   type: "GET",
   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
   success: function(data) { 
     // Do something with the returned data
     
       console.log(data);
       
       let chosen = data.items[Math.floor((Math.random() * 20) + 1)];
       
       console.log(chosen);
       
       $(".poster").css("background-image", "url('" + chosen.images[0].url + "')");
       
        $('.poster').primaryColor({
                callback: function(color) {
                    $('.poster').css('background', 'rgb('+color+')');
                }
            });
       
       data.items.map(function(artist) {
       let item = $('<li>' + artist.name + '</li>');
       item.appendTo($('#top-artists'));
     });
   }
});



// prompt authentication
function loadSpotify(){

const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = '2458e19d8ecc47e9828bad6588d6089d';
const redirectUri = 'http://localhost:8080/public';
const scopes = [
  'user-top-read'
];

    
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

}


function getImage(artist){
    
  $.ajax({
  url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist + '&api_key=2b35547bd5675d8ecb2b911ee9901f59&format=json',
  success: function(data) {
    console.log(data.artist);
  }
})
    
}