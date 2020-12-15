//Weatherbit
const WEATHERBIT_API_KEY = '2b22348588824eaebc78ca3b8e1af674';

let weatherInfo = async (latitude, longitude) => {
	const req = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${WEATHERBIT_API_KEY}`);
	try {
		const weatherData = await req.json();
		return weatherData;
	} catch (error) {
		console.log(`ERROR: Could not get data from Api. Msg: ${error}`);
		alert(`ERROR: Could not get API data. Please try again later.`);
	}
}

export {
  weatherInfo
}