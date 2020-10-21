// DOM Elements
const time = document.getElementById('time');
const day = document.getElementById('day');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');

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

// options 
// const showAmPM = true;

// show date
function showDate() {

  let today = new Date();
  let dayOfWeek = today.getDay().toString();
  let number = today.getDate();
  let month = today.getMonth().toString();

  day.innerHTML = `${days[dayOfWeek]}, ${number} ${months[month]}`;
  setTimeout(showDate, 1000);
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
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
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

  if(hour < 6) {
    document.body.style.backgroundImage = "url('assets/images/night/01.jpg')";
    greeting.textContent = 'Good Night';
    document.body.style.color = 'white';


  
  } else if (hour < 12) {
    document.body.style.backgroundImage = "url('assets/images/morning/06.jpg')";
    greeting.textContent = 'Good Morning';


  } else if (hour < 18) {
    document.body.style.backgroundImage = "url('assets/images/day/01.jpg')";
    greeting.textContent = 'Good Afternoon';


  } else {
    document.body.style.backgroundImage = "url('assets/images/evening/01.jpg')";
    greeting.textContent = 'Good Evening';
    document.body.style.color = 'white';

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
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// set focus

function setFocus(e) {
  if(e.type === 'keypress') {
    if(e.which === 13 || e.code === 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

name.addEventListener('focus', function() {
 
  name.textContent = ' ';
  name.focus();
  
});

// name.addEventListener('click', function() {
//   name.textContent = ' ';
// });



// run

showDate();

showTime();

setBgGreet();

getName();

getFocus();