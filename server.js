const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const async = require("async");

const app = express();

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'))
});

app.use(express.static("/client/public"));
app.use(bodyParser.json());

require('dotenv').load();

const MongoClient = require("mongodb").MongoClient
let db;

MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, (err, client) => {
  // ... start the server
  if (err) {return console.log(err)};
  db = client.db("lolstaticdata");

})

app.get("/", (req, resp) => {

	//resp.send("abc");
	resp.sendFile(path.join(__dirname + "/client/public/index.html"));
});

app.get("/getMatchData", (req, resp) => {

	axios.get("https://euw1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/20193482?api_key=" + process.env.RIOT_GAMES_API_KEY)
	.then(response => {

		const data = response.data;
		console.log(data);

		const summoners = data.participants;

		const blueSide = [];
		const redSide = [];

		async.each(summoners, (summoner, callback) => {

			db.collection("champions").find({_id: summoner.championId}, (err, champResult) => {
				db.collection("summonerSpells").find({_id: {$in: [summoner.spell1Id, summoner.spell2Id]}}, (err, spellResult) => {

					if (summoner.teamId === 100) {
						blueSide.push({name: champResult[0].name, championIcon: champResult[0].image, summonerSpells: [{name: spellResult[0].name, icon: spellResult[0].image, cooldown: spellResult[0]}, {name: spellResult[1].name, icon: spellResult[1].image, cooldown: spellResult[1]}]})
					} else {
						redSide.push({name: champResult[0].name, championIcon: champResult[0].image, summonerSpells: [{name: spellResult[0].name, icon: spellResult[0].image, cooldown: spellResult[0]}, {name: spellResult[1].name, icon: spellResult[1].image, cooldown: spellResult[1]}]})
					}
				})
			})

		}, () => {
			resp.send(JSON.stringify({blueSide: blueSide, redSide: redSide}));
		})
	})
	.catch(err => console.log(err));

	//resp.send(JSON.stringify());
});

app.get("/getStaticData", (req, resp) => {
	getData(resp);
	/*for (let i = 2; i < 130; i++){
		axios.get("https://euw1.api.riotgames.com/lol/static-data/v3/champions/" + i + "?locale=en_US&champData=all&api_key=" + process.env.RIOT_GAMES_API_KEY)
		.then(response => {
			const data = response.data;

			const champion = {
				_id: i,
				name: data.name,
				image: data.image,
				stats: data.stats
			}

			db.collection("champions").insertOne(champion, (err, res) => {
				if (err) return console.log(err)

			    console.log('saved to database')
			    resp.send("done");
			})
		})

		await sleep(1);
	}*/
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getData(resp) {
	for (let i = 1; i < 130; i++){
		axios.get("https://euw1.api.riotgames.com/lol/static-data/v3/champions/" + i + "?locale=en_US&champData=all&api_key=" + process.env.RIOT_GAMES_API_KEY)
		.then(response => {
			const data = response.data;

			const champion = {
				_id: i,
				name: data.name,
				image: data.image,
				stats: data.stats
			}

			db.collection("champions").insertOne(champion, (err, res) => {
				if (err) return console.log(err)

			    console.log('saved to database')
			    resp.send("done");
			})
		})

		await sleep(1000);
	}
}
