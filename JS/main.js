
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


  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    type: ['cafe']
  }, callbackk);
 

  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    type: ['bar']
  }, callbackk1);
 
 


 
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

function callbackk(results, status) {
  
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    
    }
  }

  
}


function callbackk1(results, status) {
  
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
     
    }
  }

  
}


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

  let photoRestaurant;
  if (result.photos) {
    photoRestaurant = result.photos[0].getUrl({'maxWidith': 400,
      'maxHeight': 200});
  } else {
    photoRestaurant = '../IMAGES/nofoto.jpg';
  }
 









  

resultado+= `
<div class="card">
  <div class="card-header">
   
  </div>
  <div class="card-body">
    <h5 class="card-title">${result.name}</h5>
    <p class="card-text"><img src="${photoRestaurant}" class="img-fluid img-thumbnail" alt="Responsive image"> </p>
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#${result.id}">
  Mas info
    </button>
  </div>
</div>
<!-- Modal -->
<div class="modal fade" id="${result.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"> ${result.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="CERRAR">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      

      
      ${result.vicinity}
     
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
        
      </div>
    </div>
  </div>
</div>
`;

Restaurants.innerHTML = resultado;

}




