import {
	cityData
} from './cityData'
import {
	weatherInfo
} from './weatherInfo'
import {
	cityImg
} from './cityImg'
import {
	show
} from './show'

const GEONAMES_USERNAME = 'bahodir_media';
//Pixabay
const PIXABAY_API_KEY = '19509353-9c8b90d5b1914625113889dbf';

let handleSubmit = (e) => {
	e.preventDefault()
	// Information from user inputs
	let fromCity = document.querySelector('#from').value;
	let toCity = document.querySelector('#to').value;
	let when = document.querySelector('#date').value;
	const timeNow = (Date.now()) / 1000;
	const time = (new Date(when).getTime()) / 1000;

	//Validating inputs
	Client.checkInputs(fromCity, toCity)

	//When evertything good we sort data
	if (fromCity, toCity) {
		cityData(toCity, GEONAMES_USERNAME)
			//Getting data from Geonames API		
			.then((cityData) => {
				console.log(cityData);
				const latitude = cityData.geonames[0].lat;
				const longitude = cityData.geonames[0].lng;
				const weatherData = weatherInfo(latitude, longitude)
				return weatherData;
			}) //Getting data from Weatherbit API		
			.then((weatherData) => {
				console.log(weatherData);
				const daysCount = Math.round((time - timeNow) / 86400);
				const allData = postAllData('http://localhost:8081/addData', {
					fromCity,
					toCity,
					weather: weatherData.data[0].high_temp,
					icon: weatherData.data[0].weather.icon,
					description: weatherData.data[0].weather.description,
					daysCount
				});
				return allData
			})
			// .then((allData) => {
			// 	console.log(allData);
			// 	const cityImg = cityImg(allData.toCity)
			// 	return cityImg;
			// })
			.then((allData) => {
				show(allData);
			})
	} else {
		console.log(`Inputs can't be empty please fill them`);
		alert(`Inputs can't be empty please fill them`)
	}
};

//Post all data
let postAllData = async (url = '', data = {}) => {
	const req = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json;charset=UTF-8"
		},
		body: JSON.stringify({
			fromCity: data.fromCity,
			toCity: data.toCity,
			toDate: data.toDate,
			weather: data.weather,
			icon: data.icon,
			description: data.description,
			daysCount: data.daysCount
		})
	})
	try {
		const allData = await req.json();
		return allData;
	} catch (error) {
		console.log(`ERROR: Could not get data from Api. Msg: ${error}`);
		alert(`ERROR: Could not get API data. Please try again later.`);
	}
}


export {
	handleSubmit
}