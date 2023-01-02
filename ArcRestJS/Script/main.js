const apiKey = 
      "AAPKce0be5991de04784a66d555a22613c7410GbB-M1mm0nwKmpkfK4CDWqbsb-beVn86OXbKrBe0HsKlHcfokYXXrA_F3XoVEt";

const basemapEnum = "ArcGIS:Navigation";

const map = new maplibregl.Map({
      container: "map",
      style: `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${basemapEnum}?type=style&token=${apiKey}`,
      zoom: 3,
      center: [22.94297692002587,49.13761179873791 ] // Initail  State of the map
    });

class GeocodeControl {
      onAdd(map) {
        const template = document.createElement("template");
        template.innerHTML = `
          <div id="geocode-container">
            <input id="geocode-input" class="maplibregl-ctrl" type="text" placeholder="Enter an address or place e.g. 1 York St" size="50" />
            <button id="geocode-button" class="maplibregl-ctrl">Search</button>
          </div>
        `;
        return template.content;
      }
    }

 const geocodeControl = new GeocodeControl();
 map.addControl(geocodeControl, "top-left");

document.getElementById("geocode-button").addEventListener("click", () => {

const query = document.getElementById("geocode-input").value;
const authentication = arcgisRest.ApiKeyManager.fromKey(apiKey);
arcgisRest
.geocode({
          singleLine: query,
          authentication,
          params: {
            location: map.getCenter().toArray().join(","), // center of map as longitude,latitude
            outFields: "*" // return all fields
          }
        })
.then((response) => {

  // document.querySelector(".loader").style.visibility = "visible"//stop the load
    const result = response.candidates[0];
          if (!result) {
            alert("That query didn't match any geocoding results.");
            return;
          }
        
          const lngLat = [result.location.x, result.location.y];

          new maplibregl.Popup().setLngLat(lngLat).setHTML(result.attributes.LongLabel).addTo(map);

          map.panTo(lngLat);

        })
        .catch((error) => {
          alert("There was a problem using the geocoder. See the console for details.");
          console.error(error);
        });
});
