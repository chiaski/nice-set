
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
       
    $("._topartist").text(chosen.name);
       
    // Do supporting acts?
    
    if(Math.random() > .5){
        
        for(let i = 0; i < 2; i++){

             let artist = data.items[Math.floor((Math.random() * 20) + 1)];
            
            if(artist.name == chosen.name){
                i--; continue;
            }
            
            $(".poster-supportingacts").append("<strong>" + artist.name + "</strong>");
            
        }

    }
       
		 var d = new Date();
		$("._date").text(d.getMonth() + 1+ " " + d.getDay() + " " + d.getFullYear());
       
    // set image and fetch palette
       
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

        $(".poster").css("background-color",  swatches['DarkMuted'].getHex());
        
        styleLoc();

        $(".poster-image").css("background-image", "url('" + chosen.images[0].url + "')");
        
        $(".poster-image").css("background-size", "cover");
        
      //  $(".poster-text").addClass("poster-text-2");
        
        $(".poster-text").css("color",  swatches['Vibrant'].getHex());
        
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


function styleLoc(){
    
    switch( Math.floor(Math.random() * 1) + 1){
        case 0:
            console.log("style 0");
            
            $(".poster-image").css("background-position", "center left");
            
            $(".poster-text").addClass("poster-text-2");
            
            break;
        case 1:
            
            console.log("style 1: gray");
            
            $(".poster-image").css("background-position", "bottom right")
            
            $(".poster-text").addClass("gray");
            $(".solid-overlay").addClass("gray");
            $(".poster-image").addClass("gray");
                

            break;
        case 2:
            console.log("style 2: gray");
            $(".poster-image").css("background-position", "90% 20%")
            
            $(".poster-text")
                .css("margin-bottom", "200px")
                .css("margin-top", "auto");
            
            break;
        case 3:
            console.log("style 3: gray");
				
            $(".poster-image").css("background-position", "10% 50%")
            
            
            break;
        case 4:
            console.log("style 4: gray");
				
            $(".poster-image").css("background-position", "bottom right");
				
            
            break;
        case 5:
            console.log("style 5: gray");
				
            $(".poster-image").css("background-position", "90% 20%")
            
            $(".poster-text")
                .css("margin-bottom", "100px");
            
            break;
        case 6:
            console.log("style 6: gray");
				
            $(".poster-image").css("background-position", "10% 50%")
            
            $(".poster-text")
                .css("margin-bottom", "100px");
            
            break;
    }
    
}

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
