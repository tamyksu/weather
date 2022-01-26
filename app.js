const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
  res.sendFile(__dirname+ "/index.html");
});

app.post("/", function(req,res){
const location = req.body.cityName
const apiKey = "1a495c6895cc48e3395ec46cc55f90fc"
const units = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ location +"&appid="+apiKey+"&units="+units;
https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const weather = JSON.parse(data)
    
        const x = weather.weather[0].description
        const tmp = weather.main.temp
        console.log(x);
        const icon = "http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"
        
        res.write("<p>The temp "+ tmp +"<p>");
        res.write("<h1>The temp in "+location +" is "+ tmp + " deg </h1>");
        res.write("<img src=" +icon +">");
        res.send()
    })
})

})


app.listen(3000, function(){
    console.log("Server running on port 3000")
})