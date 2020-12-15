//Geonames API

let cityData = async (toCity, GEONAMES_USERNAME) => {
  const res = await fetch(`http://api.geonames.org/searchJSON?q=${toCity}&username=${GEONAMES_USERNAME}`);
  try {
    const cityData = await res.json();
    return cityData;
  } catch (error) {
    console.log(`ERROR: Could not get data from Api. Msg: ${error}`);
    alert(`ERROR: Could not get City data from Geonames Api. Please try again later.`);
  }
}

export {
  cityData
}