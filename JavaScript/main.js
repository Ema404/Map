//  Step 1: Create and set up the Map and basemap;
// set the API Access token. 

// set center initaila state for the map :
var latitude
var longitude
 var address
const button = document.getElementById('button')

document.addEventListener("load",()=>{
  address = document.getElementById("search").value.toUpperCase()
})

mapboxgl.accessToken = 
    'pk.eyJ1IjoiZW1hbjEyMjgiLCJhIjoiY2xjZGJ1ZDN3MDBpNzNuczBjZG41MTBmeiJ9.OLgt59n0Jvlz8MBO6Y3Z3g';

    //mapboxgl.Map to initialize a Mapbox map inside an HTML element on a webpage
const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [35.9202816, 31.9881216], //it assumes that the coordinates are in longitude, latitude order 
        zoom: 9
    });

// Step2 : GeoCoding procces.
const accessKey ='2f62756629fe3ff9a8dea086c453bad7'


button.addEventListener("click", () => {
     address = document.getElementById("search").value.toUpperCase()
     console.log(address)
     //remove space
    //Make GET HTTP Request
    $.ajax({
        url: 'http://api.positionstack.com/v1/forward',
        data: {
          access_key: accessKey,
          query: address,
          output : 'json', 
          callback :errorCallback,
          limit: 1
        }
      }).done(function(data) {
        console.log((data))
      })
    });