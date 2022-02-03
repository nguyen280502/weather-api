const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const validation = require('./validation');

const app = express();
const port = 7000;

app.use(bodyParser.urlencoded({ extended: true }));
const apiKey = "bec72e0db6c9c65e1f30edd8fcf1cfa7";
const unit = "metric";

// route get to index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// route post to apply data from openweather
app.post("/", (req, res) => {
  const city = req.body.city;
  if(validation.isEmpty(city)) {
    res.sendFile(__dirname + "/index.html");
    return;
  }
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey + "&units=" + unit;
  https.get(url, (response) => {  
    console.log(response.statusCode);
    if(response.statusCode == 200){
      response.on("data", function(chunk){
        const wetherData = JSON.parse(chunk);
        console.log(wetherData);
        const icon = "https://openweathermap.org/img/wn/" + wetherData.weather[0].icon + "@2x.png";
        console.log(icon);
        res.write("<h1>" + city + "</h1>");
        res.write("<h3>Temperatur: " + wetherData.main.temp + "</h3>" + '<img src="' + icon + '" alt="not possible">');
        res.write("<br><a href=/" + ">BACK</a>");
        res.send();
      });
    } else {
      res.sendFile(__dirname + "/index.html");
    }
  });
});


// starts server on heroku need process.env.PORT
app.listen(process.env.PORT || port, () => {
  console.log("App run on port " + port);
});
