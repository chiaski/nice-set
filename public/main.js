

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

let _token = hash.access_token;


// stylize poster
$.ajax({
   url: "https://api.spotify.com/v1/me/top/artists",
   type: "GET",
   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
   success: function(data) { 
    
    console.log(data);
       
    let chosen = data.items[Math.floor((Math.random() * 20) + 1)];
       
    console.log(chosen);
    var img = document.createElement('img');
    img.crossOrigin = "Anonymous";

    img.setAttribute('src', chosen.images[0].url)

    img.addEventListener('load', function() {
        var vibrant = new Vibrant(img);
        var swatches = vibrant.swatches()
        console.log(swatches);
        for (var swatch in swatches)
            if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                console.log(swatch, swatches[swatch].getHex())

        $(".poster").css("background-color",  swatches['Muted'].getHex());

       
        $(".poster").css("background-image", "url('" + chosen.images[0].url + "')");
        
        $(".poster").css("background-size", "cover");
        
        $(".poster-text").css("color",  swatches['LightVibrant'].getHex());
        
        
        /*
         * Results into:
         * Vibrant #7a4426
         * Muted #7b9eae
         * DarkVibrant #348945
         * DarkMuted #141414
         * LightVibrant #f3ccb4
         */
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
