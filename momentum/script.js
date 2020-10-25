// DOM Elements
const time = document.getElementById('time');
const day = document.getElementById('day');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focuss = document.getElementById('focus');

const days = {
  '0' : 'Sunday',
  '1' : 'Monday',
  '2' : 'Tuesday',
  '3' : 'Wednesday',
  '4' : 'Thursday',
  '5' : 'Friday',
  '6' : 'Saturday'
};

const months = {
  '0' : 'January',
  '1' : 'February',
  '2' : 'March',
  '3' : 'April',
  '4' : 'May',
  '5' : 'June',
  '6' : 'July',
  '7' : 'August',
  '8' : 'September',
  '9' : 'October',
  '10' : 'November',
  '11' : 'December'
};

let currentHour;

const base = 'assets/images/';

let images = [];

const nightImages = ['night/01.jpg', 'night/02.jpg', 'night/03.jpg', 'night/04.jpg', 'night/05.jpg', 'night/06.jpg', 'night/07.jpg','night/08.jpg','night/09.jpg','night/10.jpg','night/11.jpg','night/12.jpg','night/13.jpg','night/14.jpg','night/15.jpg','night/16.jpg','night/17.jpg','night/18.jpg','night/19.jpg','night/20.jpg'];

const morningImages = ['morning/01.jpg', 'morning/02.jpg', 'morning/03.jpg', 'morning/04.jpg', 'morning/05.jpg', 'morning/06.jpg', 'morning/07.jpg','morning/08.jpg','morning/09.jpg','morning/10.jpg','morning/11.jpg','morning/12.jpg','morning/13.jpg','morning/14.jpg','morning/15.jpg','morning/16.jpg','morning/17.jpg','morning/18.jpg','morning/19.jpg','morning/20.jpg'];

const dayImages = ['day/01.jpg', 'day/02.jpg', 'day/03.jpg', 'day/04.jpg', 'day/05.jpg', 'day/06.jpg', 'day/07.jpg','day/08.jpg','day/09.jpg','day/10.jpg','day/11.jpg','day/12.jpg','day/13.jpg','day/14.jpg','day/15.jpg','day/16.jpg','day/17.jpg','day/18.jpg','day/19.jpg','day/20.jpg'];

const eveningImages = ['evening/01.jpg', 'evening/02.jpg', 'evening/03.jpg', 'evening/04.jpg', 'evening/05.jpg', 'evening/06.jpg', 'evening/07.jpg','evening/08.jpg','evening/09.jpg','evening/10.jpg','evening/11.jpg','evening/12.jpg','evening/13.jpg','evening/14.jpg','evening/15.jpg','evening/16.jpg','evening/17.jpg','evening/18.jpg','evening/19.jpg','evening/20.jpg'];



function createImagesOfDay() {
  createImages(nightImages);
  createImages(morningImages);
  createImages(dayImages);
  createImages(eveningImages);
}

function createImages(setOfImages) {
  // console.log ('createImages');
  let currNumb;
  let arr = [];
  while(arr.length < 6) {
    currNumb = Math.floor((Math.random() * 20));
    // console.log(`currentNumb=${currNumb}`);
    if (!arr.includes(setOfImages[currNumb])) {
      arr.push(setOfImages[currNumb]);
      images.push(setOfImages[currNumb]);
      // console.log(`arr=${arr}`);
      // console.log(`images=${images}`);
    }
  }
}

// console.log(images);




// options 
// const showAmPM = true;

// show date
function showDate() {

  let today = new Date();
  let dayOfWeek = today.getDay().toString();
  let number = today.getDate();
  let month = today.getMonth().toString();

  // day.innerHTML = `${days[dayOfWeek]}, ${number} ${months[month]}`;

  day.innerHTML = `<div class="week-day">${days[dayOfWeek]},&nbsp; 
  </div>
  <div class="day-month">${number} ${months[month]}
  </div>`;
  // setTimeout(showDate, 1000);
} 

// Show time
function showTime() {

  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  // set PM or AM
  // const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  // hour = hour % 12 || 12;

  // output time
  // time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPM ? amPm : ''}`;
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  if (hour === 0 && min === 0 && sec === 0) {
    showDate();
  }

  if(min === 59 && sec === 59 ) {
    setTimeout(setBgGreet, 1000);
  }
  setTimeout(showTime, 1000);

}

// add zero 
function addZero(n) {
  return (parseInt(n,10) < 10 ? '0' : '') + n;
}



// set background and greeting 
function setBgGreet() {

  let today = new Date();
  let hour = today.getHours();

  document.body.style.backgroundImage = `url(${base + images[hour]})`;

  if(hour < 6) {   
    greeting.textContent = 'Good Night,';
    // document.body.style.color = 'white';
  
  } else if (hour < 12) {   
    greeting.textContent = 'Good Morning,';
    // document.body.style.color = 'black';

  } else if (hour < 18) {
    greeting.textContent = 'Good Afternoon,';
    // document.body.style.color = 'black';

  } else {
    greeting.textContent = 'Good Evening,';
    // document.body.style.color = 'white';
  }
}

// get name

function getName() {
  if(localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// set name

function setName(e) {
  // console.log('setname');
  if(e.type === 'keypress') {
    if(e.which === 13 || e.code === 13) {
      if(e.target.innerText.trim() === '') {
        getName();
        name.blur();             
      } else {
      localStorage.setItem('name', e.target.innerText);
      name.blur();     
      }
    }
  } else {
    if(e.target.innerText.trim() === '') {      
      getName();     
    } else {  
     localStorage.setItem('name', e.target.innerText);    
    }
  }   
}


// get focus

function getFocus() {
  if(localStorage.getItem('focus') === null) {
    focuss.textContent = '[Enter Focus]';
  } else {
    focuss.textContent = localStorage.getItem('focus');
  }
}

// set focus

function setFocus(e) {
  if(e.type === 'keypress') {
    if(e.which === 13 || e.code === 13) {
      if(e.target.innerText.trim() === '') {
        getFocus();
        focuss.blur();             
      } else {
      localStorage.setItem('focus', e.target.innerText);
      focuss.blur();     
      }
    }
  } else {
    if(e.target.innerText.trim() === '') {      
      getFocus();     
    } else {  
     localStorage.setItem('focus', e.target.innerText);    
    }
  }
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focuss.addEventListener('keypress', setFocus);
focuss.addEventListener('blur', setFocus);

name.addEventListener('click', function(e) {
  name.textContent = ' ';
  name.focus();
  
});

focuss.addEventListener('click', function(e) {
  focuss.textContent = ' ';
  focuss.focus();
  
});

// name.addEventListener('click', function() {
//   name.textContent = ' ';
// });

// btn click

const btnBg = document.querySelector('.btn-bg');
btnBg.addEventListener('click', getImage);
let i = new Date().getHours();


function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}



function getImage() {

  let currentHour = new Date().getHours();
  if (i === currentHour) {
    i++;
  }
  const index = i % images.length;
  const imageSrc = base + images[index];
  viewBgImage(imageSrc);
  i++;
  btnBg.disabled = true;
  setTimeout(function() { btnBg.disabled = false }, 1000);

} 



// quote 

const blockquote = document.querySelector('.blockquote');
const figcaption = document.querySelector('.figcaption');
const btnQuote = document.querySelector('.btn-quote');

async function getQuote() {  
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  if (data.quote.quoteText.length <= 150) {
    blockquote.textContent = data.quote.quoteText;
    figcaption.textContent = data.quote.quoteAuthor;
  } else {
    getQuote();
  }
  
  
  // console.log(`blockquote=${blockquote.textContent.length}`);
};



btnQuote.addEventListener('click', getQuote);


// weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');


function getFirstWeather() {
  if(localStorage.getItem('city') === null) {
    city.textContent = 'Minsk';
  } else { 
    city.textContent = localStorage.getItem('city');
  }


  getWeather();

}

async function getWeather() {
  // console.log(`localstorage = ${localStorage.getItem('city')} `);
  
  // console.log(`getweather`);
  
  // if (city.textContent.trim() === '') {
  //   city.textContent = localStorage.getItem('city');
  // }
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=bcb497104c33d6150519c07eb56c6273&units=metric`;
  // console.log(`city textcontent =${city.textContent}`);
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=bcb497104c33d6150519c07eb56c6273&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(`data=${data.weather[0]}`);
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `wind ${data.wind.speed} m/s`;
    humidity.textContent = `humidity ${data.main.humidity} %`; 
    localStorage.setItem('city', city.textContent);

  } catch {
    city.textContent = 'Enter correct city';
    city.style.color = 'red';
  }
  // console.log(`localstorage = ${localStorage.getItem('city')} `);
}

document.addEventListener('DOMContentLoaded', getFirstWeather());
city.addEventListener('keypress', setCity);


city.addEventListener('blur', function (e) {
  
  // city.style.color = 'white';
  if (city.textContent.trim() === '') {
    city.textContent = localStorage.getItem('city');
    getWeather();
  } else {
    getWeather();
  }  
}); 

city.addEventListener('click', function(e) {
  city.style.color = 'white';
  city.textContent = ' ';
  city.focus();
  
});

function setCity(event) {
  city.style.color = 'white';
  if (event.code === 'Enter') {
    if (city.textContent.trim() === '') {
    city.textContent = localStorage.getItem('city');
  }
    // localStorage.setItem('city', city.textContent);
    getWeather();
    city.blur();
  }  
 
}


// getWeather();







// run

createImagesOfDay();

showDate();

showTime();

setBgGreet();

getName();

getFocus();

// getQuote();






// async function getQuote() {
//   const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
//   const res = await fetch(url);
//   const data = await res.json();
//   blockquote.textContent = data.quoteText;
//   btnQuote.addEventListener('click', getQuote);
// }

// bcb497104c33d6150519c07eb56c6273

// https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=bcb497104c33d6150519c07eb56c6273&units=metric

document.addEventListener('DOMContentLoaded', getQuote);