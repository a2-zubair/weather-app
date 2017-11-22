$(document).ready(function(){
    var lat, lon, city, country, tempUnit="F", switchTemp = true;

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
            
            $("#tempUnit").click(function(){
                var currentTempUnit = $("#tempUnit").text();
                var newTempUnit =  currentTempUnit === "C" ? "F" : "C";
                $("#tempUnit").text(newTempUnit);
                if(newTempUnit == "F"){
                    $("#temp").text(fahrenheit + " " + String.fromCharCode(176));
                }else{
                    $("#temp").text(celcius + " " + String.fromCharCode(176));
                }
            });

            function getWindSpeed(){
                var windMPH = (2.23694 * windMeterPerSec);
                return (1.609344 * windMPH).toFixed(2);
            }

            function getIconDayOrNight(){
                if(Date("H") <= 18){
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
            $("#windSpeed").text(getWindSpeed() + " km/h");
            $("#cloud").text(weatherCloud + "%");
        });
    });
});