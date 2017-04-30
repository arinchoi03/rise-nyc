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
I used react-google-maps, firebase for database storage, and react!
