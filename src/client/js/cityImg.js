let cityImg = async(toCity) => {

	const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${toCity}city&image_type=photo`);
	
	try {
		const pixabayImg = await response.json();
			return pixabayImg;
	} catch (error) {
		console.log(`ERROR: Could not get data from Api. Msg: ${error}`);
		alert(`ERROR: Could not get image. Please try again later.`);
	}
}

export {
  cityImg
}