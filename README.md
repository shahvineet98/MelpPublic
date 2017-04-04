# MelpPublic

Check it out live at: https://melp-app.herokuapp.com/

![alt tag](http://i.imgur.com/J0Fyi37.png)

### What is Melp:

Melp is a web app that was built using Node.js

It will get your current location using HTML5 Geolocation if you give it permission and it will plot places to eat around you.

### Preferences
You can change your preferences to filter out certain restaurants around you. 

![alt tag](http://i.imgur.com/x5xzxK2.png)

### Map
The map will be updated with markers once your location has been found

![alt tag](http://i.imgur.com/YOA7hCu.png)

### Marker Information
Once you click on a marker on the Google Map it will populate the bottom right section of the screen with more information about that place.

![alt tag](http://i.imgur.com/MtdcRGR.png)

### Send to Phone

You can also get the name of the place, its address and phone number texted to you by pressing the corresponding button. Simply type in your phone number after pressing the button and press send and the message will send using the Twilio API.

## How to Install

If you want to run this file locally do the following:

```bash
$ git clone https://github.com/shahvineet98/MelpPublic.git
```

Change into the directory that was downloaded

```bash
$ npm install
```

Now edit the config.js with your Twilio Credentials and Yelp-Fusion API Credentials

```bash
$ npm start
```
The app should now be running on port 5000 
