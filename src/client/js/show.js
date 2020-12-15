let show = async (allData) => {
  document.querySelector("#city").innerHTML = allData.fromCity;
  document.querySelector("#city2").innerHTML = allData.toCity;
  document.querySelector("#depart").innerHTML = date.value;
  document.querySelector("#days").innerHTML = allData.daysCount;
  document.querySelector("#description").innerHTML = allData.description;
  document.querySelector("#temp").innerHTML = allData.weather;
  document.querySelector("#cloud").setAttribute('src', `https://www.weatherbit.io/static/img/icons/${allData.icon}.png`)
}

export {
  show
}