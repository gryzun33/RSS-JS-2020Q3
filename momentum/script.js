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

const images = ['night/01.jpg', 'night/02.jpg', 'night/03.jpg', 'night/04.jpg', 'night/05.jpg', 'night/06.jpg', 'morning/01.jpg', 'morning/02.jpg', 'morning/03.jpg', 'morning/04.jpg', 'morning/05.jpg', 'morning/06.jpg', 'day/01.jpg', 'day/02.jpg', 'day/03.jpg', 'day/04.jpg', 'day/05.jpg', 'day/06.jpg', 'evening/01.jpg', 'evening/02.jpg', 'evening/03.jpg', 'evening/04.jpg', 'evening/05.jpg', 'evening/06.jpg']; 

// options 
// const showAmPM = true;

// show date
function showDate() {

  let today = new Date();
  let dayOfWeek = today.getDay().toString();
  let number = today.getDate();
  let month = today.getMonth().toString();

  day.innerHTML = `${days[dayOfWeek]}, ${number} ${months[month]}`;
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
    greeting.textContent = 'Good Night';
    // document.body.style.color = 'white';
  
  } else if (hour < 12) {   
    greeting.textContent = 'Good Morning';
    // document.body.style.color = 'black';

  } else if (hour < 18) {
    greeting.textContent = 'Good Afternoon';
    // document.body.style.color = 'black';

  } else {
    greeting.textContent = 'Good Evening';
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
  console.log('setname');
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

const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);
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
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);
} 


// run

showDate();

showTime();

setBgGreet();

getName();

getFocus();





