## LoL Timer Helper

  LoL Timer Helper is a web app - for the game called League of Legends - that helps you track summoner spell cooldowns, jungle buffs and dragon/baron spawn times.

## How To Use
  
  First enter a summoner name on top right corner, to get data from your game. Note: You have to be in game to get the data.
  After that you will see all the champions - that are in your game - and their summoner spells. By clicking on a summoner spell it sets a timer corresponding to the cooldown of that summoner spell. At certain points the app tells you how long left for example "Teemo's flash is up in 1 minute" by speaking it aloud.

## Installing & Running
  
  If you want to run it locally, you will need to have Node.js installed, a Riot Games API key and a Mongo Database.
  First create a .env file and add your API key and Mongo DB connection string

  ```
  //.env File
  RIOT_GAMES_API_KEY = Your riot games api key
  DATABASE_CONNECTION_STRING = Your mongo db connection string
  ```

  After this run the following commands

  ```
  npm install
  npm start
  ```

  Now your app should be running, you have to seed the database with champion and summoner spell data. You can do this by visiting /getChampData and /getSpellData

  Now everything should be setup and you can use to app.