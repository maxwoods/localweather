/* 
TODO
--Make this work in other countries
--Detect if HTTP and redirect to HTTPS
*/
var weatherApp = {
  weatherObj: {},
  
  /* First, grab geolocation coordinates */
  onReady: function() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(weatherApp.getLocation);
    }
  },
  
  /* Callback for location retrieval; 
  uses lat, lon to make call to wunderground API for JSON location data */
  getLocation: function(position) {
    console.log("Made it");
    var lat = position.coords.latitude.toFixed(6);
    var lon = position.coords.longitude.toFixed(6);
    
    $.getJSON("https://api.wunderground.com/api/dd2169d8f4269a6b/geolookup/q/" + 
             lat + "," + lon + ".json", weatherApp.getWeather);
  },
  
  /* Callback for wunderground location retrieval; 
  parses JSON location data and retrieves weather */
  getWeather: function(data) {
    var location = data['location'];
    var city = location['city'];
    var state = location['state'];
    var country = location['country_iso3166'];
    $(".location").text(city + ", " + state);
    $.getJSON("https://api.wunderground.com/api/dd2169d8f4269a6b/conditions/q/" +
                country + '/' + state + '/' + 
                city + ".json", weatherApp.insertWeather);
  },
  
  /* Insert weather data into the DOM */
  insertWeather: function(data) {
    weatherApp.weatherObj = data['current_observation']
    $(".loading").hide();
    $(".data").show();
    $(".description").text(weatherApp.weatherObj['weather']);
    $(".temperature").html(weatherApp.weatherObj['temp_f'] + '&#8457;');
    $(".weather-icon").addClass(weatherApp.iconMappings[weatherApp.weatherObj['icon']]);
  },
  
  /* Toggle between Celsius and Fahrenheit */
  changeTempFormat: function() {
    if ($(".temp-box").is(':checked')) {
      $(".temperature").html(weatherApp.weatherObj['temp_c'] + '&#8451;')
    } else {
      $(".temperature").html(weatherApp.weatherObj['temp_f'] + '&#8457;')
    }
  },
  
  
  /* Map wunderground weather icon names to weather-icon names */
  iconMappings: {
    "chanceflurries" : "wi-day-snow-wind",
    "chancerain" : "wi-day-rain",
    "chancesleet" : "wi-day-sleet",
    "chancesnow" : "wi-day-snow",
    "chancetstorms" : "wi-day-thunderstorm",
    "clear" : "wi-day-sunny",
    "cloudy" : "wi-day-cloudy",
    "flurries" : "wi-day-snow-wind",
    "fog" : "wi-day-fog",
    "hazy" : "wi-day-haze",
    "mostlycloudy" : "wi-day-cloudy-high",
    "mostlysunny" : "wi-day-sunny",
    "partlycloudy" : "wi-day-sunny-overcast",
    "partlysunny" : "wi-day-sunny-overcast",
    "sleet" : "wi-day-sleet",
    "rain" : "wi-day-rain",
    "snow" : "wi-day-snow",
    "sunny" : "wi-day-sunny",
    "tstorms" : "wi-day-thunderstorm",
    "nt_chanceflurries" : "wi-night-snow-wind",
    "nt_chancerain" : "wi-night-rain",
    "nt_chancesleet" : "wi-night-sleet",
    "nt_chancesnow" : "wi-night-snow",
    "nt_chancetstorms" : "wi-night-thunderstorm",
    "nt_clear" : "wi-night-clear",
    "nt_cloudy" : "wi-night-cloudy",
    "nt_flurries" : "wi-night-snow-wind",
    "nt_fog" : "wi-night-fog",
    "nt_hazy" : "wi-night-fog",
    "nt_mostlycloudy" : "wi-night-cloudy-high",
    "nt_mostlysunny" : "wi-night-clear",
    "nt_partlycloudy" : "wi-night-sunny-overcast",
    "nt_partlysunny" : "wi-night-cloudy",
    "nt_sleet" : "wi-night-sleet",
    "nt_rain" : "wi-night-rain",
    "nt_snow" : "wi-night-snow",
    "nt_sunny" : "wi-night-clear",
    "nt_tstorms" : "wi-night-thunderstorm"
    }
};

$(document).ready(weatherApp.onReady);
$('.temp-box').change(weatherApp.changeTempFormat);