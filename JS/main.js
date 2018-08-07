
let resultado ="";
let datosRestaurants ="";
var map;
var infowindow;




navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    let positionUser =  Object.values(pos);
let latitude = positionUser[0];
let longitude = positionUser[1];
initMap(latitude,longitude)

})
   

function initMap(lati,longi) {
  
  console.log(longi)
  var pyrmont = new google.maps.LatLng(lati,longi);

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    type: ['restaurant']
  }, callback);
 
}

function callback(results, status) {
  datosRestaurants = results;
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      PrintRestaurant(results[i]);
    }
  }

  
}

/*function createMarker(place) {
    var placeLoc = place.geometry.location;
    var photos = place.photos;
    if (!photos) {
      return;
    }
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
      icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
    });
   
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
    
      infowindow.open(map, this);
    });
  }*/
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
    
  });
   google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
  
    infowindow.open(map, this);
  });


}

PrintRestaurant = (result) => {
let photos = result.photos;

//let viwephotos = photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35});


resultado+= `


<!-- Button trigger modal -->
<p>
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
${result.name} 
</button>
</p>

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"> ${result.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      ${result.vicinity}
     
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>


`;

Restaurants.innerHTML = resultado;

}

Information = (placeInfo) => {
console.log(placeInfo)
}




/*function createMarker(place) {
    var placeLoc = place.geometry.location;
    var photos = place.photos;
    if (!photos) {
      return;
    }
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
      icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
    });
   
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
    
      infowindow.open(map, this);
    });
  }*/
  