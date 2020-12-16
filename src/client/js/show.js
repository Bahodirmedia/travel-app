const PIXABAY_API_KEY = '19509353-9c8b90d5b1914625113889dbf';


export const show = async (allData) => {

  const res = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${allData.toCity}&image_type=photo&pretty=true`);

  try {
    const pixabayImg = await res.json();

    if (pixabayImg.hits > 0) {

    }
    
    let cityImg = pixabayImg.hits[0].webformatURL;
    let cityImg2 = pixabayImg.hits[1].largeImageURL;
    console.log(cityImg);
    console.log(allData);
    document.querySelector("#city").innerHTML = allData.toCity;
    document.querySelector("#city2").innerHTML = allData.fromCity;
    document.querySelector("#depart").innerHTML = date.value;
    document.querySelector("#days").innerHTML = allData.daysCount;
    document.querySelector("#description").innerHTML = allData.description;
    document.querySelector("#temp").innerHTML = allData.weather;
    document.querySelector("#cloud").setAttribute('src', `https://www.weatherbit.io/static/img/icons/${allData.icon}.png`)
    document.querySelector("#cityimg").setAttribute('src', cityImg);
    document.querySelector(".main").style.backgroundImage = `url('${cityImg2}')`;
    
    
    //Local storage functionality
    const ul = document.querySelector('.weather__cards');
    const save = document.querySelector('#save')
    const del = document.querySelector('#clear__saved')
    let itemsArray = localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : []
  
    //Saving data to local storage
    localStorage.setItem('items', JSON.stringify(itemsArray))
    const data = JSON.parse(localStorage.getItem('items'))
    
    //Creating weather cards
    const divMaker = () => {
      const div = document.createElement('div')
      div.className = 'weather__card';
      div.innerHTML =
        `
        <p class="week__one">${allData.toCity}</p>
        <p class="week__one">${date.value}</p>
        <p class="temp">${allData.weather}<span>&#176;C</span></p>
        <p><img id="cloud2" src="https://www.weatherbit.io/static/img/icons/${allData.icon}.png" alt=""></p>
        <p class="info">${allData.description}</p>
      `
      ul.appendChild(div)
    }
    
    
    //Saving current results
    save.addEventListener('click', function (e) {
      e.preventDefault();
      itemsArray.push(allData)
      localStorage.setItem('items', JSON.stringify(itemsArray))
      divMaker(allData);
      allData = {};
    })
    
    data.forEach((item) => {
      divMaker(item)
    })
    
    
    //delating all data from local storage
    del.addEventListener('click', function () {
      localStorage.clear()
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
      }
    })
    

} catch (error) {
    console.log("error", error);
  }
}