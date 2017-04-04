'use strict';

const yelp = require('yelp-fusion');
var config = require("./config");
var express = require("express");
var path = require('path');
var compress = require('compression');
var bodyParser = require('body-parser');
var request = require("request");
var sentiment = require("sentiment");
var twilio = require("twilio");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(compress());
app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'public')));



//console.log(sentiment("Great food. But it is way too expensive to eat there. I know we are far from the ocean and food cost is at a premium. but the reason I infrequently go back is the cost. it is nice to have that option in our neighborhood. College Park Maryland is that much more diverse and palate exciting the presence of fishnet."));

app.post('/preferences', function(req, res) {
    var arr = req.body.prices;
    arr = arr.filter(Boolean);
    var priceString = "";
    for (var i = 0; i < arr.length; i++) {
        priceString += arr[i] + ","
    }
    priceString = priceString.slice(0, -1);
    var flag = false;
    if (req.body.opennow == 1)
        flag = true;

    console.log(req.body.distance)
    yelp.accessToken(config.YELP_ID, config.YELP_SECRET).then(response => {
        const client = yelp.client(response.jsonBody.access_token);
        console.log(response.jsonBody.access_token);
        client.search({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            radius: req.body.distance,
            price: priceString,
            open_now: flag,
            limit: 50
        }).then(response => {
            //console.log(response.jsonBody.businesses);
            var data = response.jsonBody.businesses;
            res.send(data);
        });
    }).catch(e => {
        console.log(e);
    });

})

app.post('/phones', function(req, res) {
    var phonenumber = req.body.phone;
    var title = req.body.title;
    var address = req.body.address;
    var restaurantnumber = req.body.restaurantnumber;

    console.log(phonenumber);
    var accountSid = config.TWILIO_SID // Your Account SID from www.twilio.com/console
    var authToken = config.TWILIO_TOKEN; // Your Auth Token from www.twilio.com/console

    var twilio = require('twilio');
    var client = new twilio.RestClient(accountSid, authToken);

    client.messages.create({
        body: title + "\n" + address + "\n Their phone number is " + restaurantnumber,
        to: '+1' + phonenumber, // Text this number
        from: '+12407729376' // From a valid Twilio number
    }, function(err, message) {
        if (err) {
            console.error(err.message);
        }
        res.send('Sent');
    });

})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
