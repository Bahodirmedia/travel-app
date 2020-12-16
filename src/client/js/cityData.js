//Geonames API
const GEONAMES_USERNAME = 'bahodir_media';
let cityData = async (toCity) => {
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