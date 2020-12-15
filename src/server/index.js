const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require('node-fetch')
console.log(`Your Wheatherbit API key is ${process.env.WEATHERBIT_API_KEY}`);
console.log(`Your Geonames username is ${process.env.GEONAMES_USERNAME}`);
console.log(`Your Pixabay API key is ${process.env.PIXABAY_API_KEY}`);

let projectData = {};

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
	extended: true
}))

app.use(express.static('dist'))


app.get('/', function (req, res) {
	res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
	console.log('Example app listening on port 8081!')
})

// post route
app.post('/addData', async function (req, res) {
	let data = req.body;
	console.log('Data from server side', data);
	projectData.fromCity = data.fromCity;
	projectData.toCity = data.toCity;
	projectData.toDate = data.toDate;
	projectData.weather1 = data.weather;
	projectData.icon1 = data.icon;
	projectData.description1 = data.description;
	projectData.daysCount = data.daysCount;
	res.send(projectData);
})