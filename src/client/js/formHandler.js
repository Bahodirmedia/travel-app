import {
	cityData
} from './cityData'
import {
	weatherInfo
} from './weatherInfo'
import {
	show
} from './show'

let reset = document.querySelector('#clear');
let save = document.querySelector('#save');
//Clear the window
reset.addEventListener('click', () => {
	// document.reload();
	location.reload();
});
save.addEventListener('click', function (e) {
  divMaker(allData);
});


//Main event
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
		cityData(toCity,)
			//Getting data from Geonames API		
			.then((cityData) => {
				console.log(cityData);
				const latitude = cityData.geonames[0].lat;
				const longitude = cityData.geonames[0].lng;
				toCity = cityData.geonames[0].toponymName
				const weatherData = weatherInfo(latitude, longitude)
				return weatherData;
			}) //Getting data from Weatherbit API		
			.then((weatherData) => {
				console.log(weatherData);
				const daysCount = Math.round((time - timeNow) / (60 * 60 * 24));
				// const pixabayImg = cityImg(toCity);
				const allData = postAllData('http://localhost:8081/addData', {
					fromCity,
					toCity,
					weather: weatherData.data[0].high_temp,
					icon: weatherData.data[0].weather.icon,
					description: weatherData.data[0].weather.description,
					daysCount,
				});
				return allData
			})
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
			daysCount: data.daysCount,
			image: data.pixabayImg
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


let modals = document.querySelectorAll('[data-modal]');

modals.forEach(function(trigger) {
  trigger.addEventListener('click', function(event) {
    event.preventDefault();
    let modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add('open');
    let exits = modal.querySelectorAll('.modal-exit');
    exits.forEach(function(exit) {
      exit.addEventListener('click', function(event) {
        event.preventDefault();
        modal.classList.remove('open');
      });
    });
  });
});

export {
	handleSubmit
}