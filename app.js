const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const cityName = req.body.cityName;
    const appKey = "460dbcc7e5666a682443f81c179b62fb";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+ appKey +"&units="+ unit +"#";

    console.log("Post request recieved.");

    https.get(url, function (response) {
        // console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const weatherIcon = weatherData.weather[0].icon;
            const weatherDescription = weatherData.weather[0].description;
            res.write("<p>The weather description is " + weatherDescription + "</p>");
            res.write("<img src=https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png>")
            res.write("<h1>" + cityName + " tempeture is " + temp + "</h1>");

            res.send();
            console.log(temp);
        });
    });
});

app.listen(3000, function () {
    console.log("The app is running.");
});
