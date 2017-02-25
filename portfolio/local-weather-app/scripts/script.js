$(document).ready(function() {

      // add Skycons
      var skycons = new Skycons({"color": "orange"});
      skycons.add("animated-icon", Skycons.CLEAR_DAY);
      skycons.play();

      // API request to gather geographic data
      $.getJSON("http://ip-api.com/json/?callback=?", function(geo) {
        var lat = geo.lat;
        var lon = geo.lon;
        var city = geo.city;
        var region = geo.regionName;
        var country = geo.country;
        var countryCode = geo.countryCode;
        var api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=6b86f165a6983f257b55ea5fd1c205d4';

        // API request to get weather information from OpenWeatherMap
        $.getJSON(api, function(data) {
          var weatherType = data.weather[0].description;
          var kelvin = data.main.temp;
          var fahrenheit = (kelvin * (9/5) - 459.67).toFixed(1);
          var celsius = (kelvin - 273.15).toFixed(1);

          // function that will default to fahrenheit for the five countries that use it, celsius for everywhere else
          function setCountryUnits() {
              if (countryCode === 'BS' || countryCode === 'BZ' || countryCode === 'KY' || countryCode === 'PW' || countryCode === 'US') {
                $("#fahrenheit").html(fahrenheit + " &#8457;");
              } else {
                $("#fahrenheit").html(celsius + " &#8451");
              }
          }

          // pushes relevant information to HTML
          $("#city").html(city + ", " + region + ", " + country);
          $("#weatherType").html(weatherType);
          $("#fahrenheit").html(setCountryUnits());
          $("#tempF").click(function() {
              $("#fahrenheit").html(fahrenheit + " &#8457;");
            });
          $("#tempC").click(function() {
              $("#fahrenheit").html(celsius + " &#8451;");
            });

          // get current time
          var currentTime = new Date().getHours();

          // set background and icons based on weather and time of day
          if ((currentTime <= 7 || currentTime > 20) && (weatherType.indexOf("clear") >= 0)) {
            skycons.set("animated-icon", Skycons.CLEAR_NIGHT);
            $('body').css('background-image', 'url(https://pixabay.com/static/uploads/photo/2014/08/12/20/40/moon-416973_960_720.jpg)');
          } else if ((currentTime <= 7 || currentTime > 20) && (weatherType.indexOf("cloud") >= 0)) {
            skycons.set("animated-icon", Skycons.PARTLY_CLOUDY_NIGHT);
            $('body').css('background-image', 'url(https://pixabay.com/static/uploads/photo/2014/09/26/07/49/moon-461907_960_720.jpg)');
          } else if (weatherType.indexOf("rain") >= 0) {
            skycons.set("animated-icon", Skycons.RAIN);
            $('body').css('background-image', 'url(https://pixabay.com/static/uploads/photo/2016/06/04/21/15/drops-1436231_960_720.jpg)');
          } else if (weatherType.indexOf("sunny") >= 0) {
            skycons.set("animated-icon", Skycons.CLEAR_DAY);
            $('body').css('background-image', 'url(https://pixabay.com/static/uploads/photo/2013/02/21/19/12/air-84675_960_720.jpg)');
          } else if (weatherType.indexOf("clear") >= 0) {
            skycons.set("animated-icon", Skycons.CLEAR_DAY);
            $('body').css('background-image', 'url(https://pixabay.com/static/uploads/photo/2015/07/02/10/40/ocean-828908_960_720.jpg)');
          } else if (weatherType.indexOf("cloud") >= 0) {
            skycons.set("animated-icon", Skycons.PARTLY_CLOUDY_DAY);
            $('body').css('background-image', 'url(https://pixabay.com/static/uploads/photo/2013/11/01/08/46/sun-203792_960_720.jpg)');
          } else if (weatherType.indexOf("thunderstorm") >= 0) {
            skycons.set("animated-icon", Skycons.SLEET);
            $('body').css('background-image', 'url(https://pixabay.com/static/uploads/photo/2016/06/13/22/12/flash-1455285_960_720.jpg)');
          } else if (weatherType.indexOf("snow") >= 0) {
            skycons.set("animated-icon", Skycons.SNOW);
            $('body').css('background-image', 'url(https://pixabay.com/static/uploads/photo/2014/12/02/22/05/snowflake-554635_960_720.jpg)');
          }

        });
      });

});
