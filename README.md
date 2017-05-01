# RISE UP nyc

Have you ever needed elevator access at a NYC subway stop? Did you get off at the station and found that the elevator is actually not working? How great would it be if you can check the status of the elevator for the stop you want to get on/off the subway from?

This is an app that allows crowd-sourcing of current status of elevators in NYC.
Currently it only holds 11 stations, but it should be easy to add all the stations (will work on in the next couple months)

This app does not require sign in. It will sign in any user as guest user since it doesn't require any account information.

# Front Page

You can enter the location you're interested in or click on Current Location to capture the location you are at! Clicking on RISE UP will take you to the Stations page

# Stations

This shows all the stations in your area (at this moment lists all the stations in db) as well as the current status at that station.
The map shows all the nearby stations (at this moment shows all the stations in db)

# Station

This page allows you to update the current status of the elvator at that station.
It loades only the last 10 statuses and the timestamp when the status was logged.

# API used
I used [react-google-maps](https://github.com/tomchentw/react-google-maps), [firebase](https://firebase.google.com) for database storage, and react!

# things to look at

Front page - just a dummy at this time
* would like to make 'current location' & 'address search' work

Stations Page
* shows current status of all elevator subway stops (that are in db)
* current location button works! re-centers map upon click
* show two panes --> keep on on stations page, one pane for single station view

Station Page
* map centers to current station
* station name updates
* station issues log - click button to update log (LOOK AT THE STATIONS PAGE! immediate update)
* shows only the 10 latest logs
