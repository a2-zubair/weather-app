$(document).ready(function(){
    var lat, lon, city, country, tempUnit="F", switchTemp = true, time = new Date().getHours();

    $.getJSON("https://ipapi.co/json", function(data){
        lat = data.latitude;
        lon = data.longitude;

        var url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=b122270f76bea1553b6a194cd41e6ba9";
        $.getJSON(url, function(weatherData){
            var cityName = weatherData.name;
            var kelvin = weatherData.main.temp;
            var celcius = (kelvin - 273.15).toFixed(0);
            var fahrenheit = (celcius * 9/5 + 32).toFixed(0);            
            var weatherDescription = weatherData.weather[0].description;
            var weatherIconID = weatherData.weather[0].id;
            var weatherHum = weatherData.main.humidity;
            var windMeterPerSec = weatherData.wind.speed;
            var weatherCloud = weatherData.clouds.all;
            
            // temperature unit with wind speed mph/kmph
            $("#tempUnit").click(function(){
                var currentTempUnit = $("#tempUnit").text();
                var newTempUnit =  currentTempUnit === "C" ? "F" : "C";
                $("#tempUnit").text(newTempUnit);
                if(newTempUnit == "F"){
                    $("#temp").text(fahrenheit + " " + String.fromCharCode(176));
                    $("#windSpeed").text(getWindSpeedMph() + " mph");
                }else{
                    $("#temp").text(celcius + " " + String.fromCharCode(176));
                    $("#windSpeed").text(getWindSpeedKmph() + " km/h");
                }
            });
            
            // wind speed mph and kmph
            function getWindSpeedMph(){
                return (2.23694 * windMeterPerSec).toFixed(2); 
            }

            function getWindSpeedKmph(){
                return (1.609344 * getWindSpeedMph()).toFixed(2);
            }
            
            //detected day or night for weather icon css 
            function getIconDayOrNight(){
                if(time < 5){
                    return "night";
                }else if(time > 5 && time < 18){
                    return "day";
                }else{
                    return "night";
                }
            }
            
            $("#temp").text(fahrenheit + " " + String.fromCharCode(176));
            $("#tempUnit").text(tempUnit);
            $("#city").html("<b>City:</b> " + cityName);            
            $("#weatherDescription").html("<b>Weather:</b> " + weatherDescription);
            $("#weatherIcon").addClass("wi wi-owm-"+getIconDayOrNight()+"-"+weatherIconID);
            $("#hum").text(weatherHum + "%");
            $("#windSpeed").text(getWindSpeedMph() + " mph");
            $("#cloud").text(weatherCloud + "%");
        });
    });
});