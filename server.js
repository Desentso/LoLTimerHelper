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

	const summonerName = req.query.summonerName;

	axios.get("https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + summonerName + "?api_key=" + process.env.RIOT_GAMES_API_KEY)
	.then(response1 => {

		const data = response1.data;
		const summonerId = data.id;
		console.log("SUMMONER ID: ", summonerId);

		axios.get("https://euw1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/" + summonerId + "?api_key=" + process.env.RIOT_GAMES_API_KEY)
		.then(response2 => {

			const data = response2.data;
			//console.log(data);

			const summoners = data.participants;

			const blueSide = [];
			const redSide = [];

			async.each(summoners, (summoner, callback) => {

				db.collection("champions").find({_id: summoner.championId}).toArray((err, champResult1) => {
					db.collection("summonerSpells").find({_id: {$in: [summoner.spell1Id, summoner.spell2Id]}}).toArray((err, spellResult1) => {

						let champResult = [{name: "Not found", image: "#"}];
						if (champResult1.length > 0) {
							champResult = champResult1;
						}

						let spellResult = [{name: "Not Found", image: "#", cooldown: 300}, {name: "Not Found", image: "#", cooldown: 300}];
						if (spellResult1.length > 1) {
							spellResult = spellResult1;
						}

						if (summoner.teamId === 100) {
							blueSide.push({name: champResult[0].name, championIcon: champResult[0].image, summonerSpells: [{name: spellResult[0].name, icon: spellResult[0].image, cooldown: spellResult[0].cooldown}, {name: spellResult[1].name, icon: spellResult[1].image, cooldown: spellResult[1].cooldown}]})
						} else {
							redSide.push({name: champResult[0].name, championIcon: champResult[0].image, summonerSpells: [{name: spellResult[0].name, icon: spellResult[0].image, cooldown: spellResult[0].cooldown}, {name: spellResult[1].name, icon: spellResult[1].image, cooldown: spellResult[1].cooldown}]})
						}
						callback(null);
					})
				})

			}, () => {
				resp.send(JSON.stringify({blueSide: blueSide, redSide: redSide}));
			})
		})
		.catch(err => console.log(err));
	})
	.catch(err => {
		console.log(err);
		resp.sendStatus(404);
	})

	//resp.send(JSON.stringify());
});

app.get("/getChampData", (req, resp) => {
	getChampData(resp);
})

app.get("/getSpellData", (req, resp) => {
	getSpellData(resp);
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getChampData(resp) {
	for (let i = 60; i < 80; i++){
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
			    //resp.send("done");
			})
		})

		await sleep(1000);
	}
	resp.send("done");
}

async function getSpellData(resp) {
	return;
	for (let i = 15; i < 25; i++){
		axios.get("https://euw1.api.riotgames.com/lol/static-data/v3/summoner-spells/" + i + "?locale=en_US&spellData=all&api_key=" + process.env.RIOT_GAMES_API_KEY)
		.then(response => {
			const data = response.data;

			const spell = {
				_id: i,
				name: data.name,
				image: data.image,
				cooldown: data.cooldown[0]
			}

			db.collection("summonerSpells").insertOne(spell, (err, res) => {
				if (err) return console.log(err)

			    console.log('saved to database')
			    //resp.send("done");
			})
		})

		await sleep(1000);
	}
	resp.send("done");
}