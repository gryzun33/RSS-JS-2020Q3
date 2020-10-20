// pets

const pets = 
[
  {
    "name": "Jennifer",
    "img": "../../assets/images/pets/pets-jennifer.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Sophia",
    "img": "../../assets/images/pets/pets-sophia.png",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Woody",
    "img": "../../assets/images/pets/pets-woody.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
  },
  {
    "name": "Scarlett",
    "img": "../../assets/images/pets/pets-scarlet.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Katrine",
    "img": "../../assets/images/pets/pets-katrine.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Timmy",
    "img": "../../assets/images/pets/pets-timmy.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
  },
  {
    "name": "Freddie",
    "img": "../../assets/images/pets/pets-freddie.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Charly",
    "img": "../../assets/images/pets/pets-charly.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
  }
];


const petsLink = document.getElementById('pets-link');
const helpLink = document.getElementById('help-link');
const contactsLink = document.getElementById('contacts-link');

helpLink.addEventListener('click', (e) => {
  e.preventDefault();
});

contactsLink.addEventListener('click', (e) => {
  e.preventDefault();
});



// burger-menu

const burger = document.querySelector('.burger-menu');
const menuMobile = document.getElementById('menu');
const darkBackground = document.createElement('div');
const header = document.querySelector('.header');

document.body.prepend(darkBackground);

burger.addEventListener('click', function() {
  if(!burger.classList.contains('burger-menu-show')) {
    burger.classList.add('burger-menu-show');
    menuMobile.classList.add('menu-show');
    burger.classList.remove('burger-menu-hide');
    menuMobile.classList.remove('menu-hide');
    darkBackground.classList.toggle('dark');
    header.classList.add('header-hide');
    document.body.style.overflow = 'hidden';
    // document.body.style.paddingRight = '15px';
    document.querySelector('.logo__title').classList.add('logo__title-color');
    document.querySelector('.logo__subtitle').classList.add('logo__subtitle-color');
    document.querySelector('.burger-menu svg').innerHTML = `<line y1="21" x2="30" y2="21" stroke="#F1CDB3" stroke-width="2"/>
    <line y1="11" x2="30" y2="11" stroke="#F1CDB3" stroke-width="2"/>
    <line y1="1" x2="30" y2="1" stroke="#F1CDB3" stroke-width="2"/>`; 
    
  
    
    
    // document.body.style.overflowY = 'hidden';
   

  } else {
    burger.classList.add('burger-menu-hide');
    burger.classList.remove('burger-menu-show');
    menuMobile.classList.add('menu-hide');
    menuMobile.classList.remove('menu-show');
    darkBackground.classList.toggle('dark');
    header.classList.remove('header-hide');
    document.body.style.overflowY = '';
    // document.body.style.paddingRight = '0';
    document.querySelector('.logo__title').classList.remove('logo__title-color');
    document.querySelector('.logo__subtitle').classList.remove('logo__subtitle-color');
    document.querySelector('.burger-menu svg').innerHTML = `<line y1="21" x2="30" y2="21" stroke="#000000" stroke-width="2"/>
    <line y1="11" x2="30" y2="11" stroke="#000000" stroke-width="2"/>
    <line y1="1" x2="30" y2="1" stroke="#000000" stroke-width="2"/>`; 
   
    
    // document.body.style.overflowY= '';
    // menuMobile.style.display = 'none';
  }  
});

darkBackground.addEventListener('click', function() {
    burger.classList.add('burger-menu-hide');
    burger.classList.remove('burger-menu-show');
    menuMobile.classList.add('menu-hide');
    menuMobile.classList.remove('menu-show');
    darkBackground.classList.toggle('dark');
    header.classList.remove('header-hide');
    document.body.style.overflowY = '';
    // document.body.style.paddingRight = '0';
    document.querySelector('.logo__title').classList.remove('logo__title-color');
    document.querySelector('.logo__subtitle').classList.remove('logo__subtitle-color');
    document.querySelector('.burger-menu svg').innerHTML = `<line y1="21" x2="30" y2="21" stroke="#000000" stroke-width="2"/>
    <line y1="11" x2="30" y2="11" stroke="#000000" stroke-width="2"/>
    <line y1="1" x2="30" y2="1" stroke="#000000" stroke-width="2"/>`; 

    // document.body.style.overflowY = '';
});

petsLink.addEventListener('click', function() {
  burger.classList.add('burger-menu-hide');
  burger.classList.remove('burger-menu-show');
  menuMobile.classList.add('menu-hide');
  menuMobile.classList.remove('menu-show');
  darkBackground.classList.toggle('dark');
  header.classList.remove('header-hide');
  document.body.style.overflowY = '';
  document.body.style.paddingRight = '0';
  document.querySelector('.logo__title').classList.remove('logo__title-color');
  document.querySelector('.logo__subtitle').classList.remove('logo__subtitle-color');
  document.querySelector('.burger-menu svg').innerHTML = `<line y1="21" x2="30" y2="21" stroke="#000000" stroke-width="2"/>
  <line y1="11" x2="30" y2="11" stroke="#000000" stroke-width="2"/>
  <line y1="1" x2="30" y2="1" stroke="#000000" stroke-width="2"/>`; 
  // document.body.style.overflowY = '';
});


// slider
let petsClone;

createPetsClone();

function createPetsClone() {
  petsClone = [];
  for (let i = 0; i < 6; i++) {
    petsClone = petsClone.concat(pets);
  }
}


// let petsClone = [];
// for (let i = 0; i < 6; i++) {
//   petsClone = petsClone.concat(pets);
// }
console.log(`start petsClone=${petsClone}`);

let petsPages = [];
let slides = [];

let currentCard;
let petsContainer = document.querySelector('.pets-container');
let isEnabled = true;

// petsClone.forEach(pet => {
//   cards.push(createCard(pet));
// });
generateSlider();

function generateSlider() {
  console.log(`generateSlider`);
  if (window.innerWidth >= 1280) {
    petsPages = createPetsPages (6, 8);
  } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    petsPages = createPetsPages (8, 6);
  } else {
    petsPages = createPetsPages (16, 3);
  }


  for (let i = 0; i < petsPages.length; i++) {
    slides[i] = document.createElement('div');
    slides[i].classList.add('pets-slide');
  
    for(let j = 0; j < petsPages[i].length; j++) {
      currentCard = createCard(petsPages[i][j]);
      slides[i].append(currentCard);
    }
    petsContainer.append(slides[i]);
  }
  
  slides[0].classList.add('active');
  
  
}


// создаем рандомный массив из питомцев
function createPetsPages (numbOfPages, numbOfPets) {
  let page = [];
  let currentNumber; 
  for (let i = 0; i < numbOfPages; i++) {
    outer:  while (page.length < numbOfPets) {
      currentNumber = Math.floor(Math.random() * 10);
      console.log(`current number= ${currentNumber}`);
      console.log(`petsClone.length=${petsClone.length}`);

      if (petsClone.length === 1) {
        currentNumber = 0;
        page.push(petsClone[currentNumber]);
        break outer;
      }
      // if(currentNumber > petsClone.length) {
      //   currentNumber = petsClone.length - 1;
      // }
      if(petsClone[currentNumber] && !page.includes(petsClone[currentNumber])) {
        page.push(petsClone[currentNumber]);
        petsClone.splice(currentNumber,1);    
      }
    }
    // console.log(`petsClone.length=${petsClone.length}`);
    console.log(page);
    petsPages.push(page);
    page = [];
  }
 
  return petsPages;
}
console.log(`petsPages.length=${petsPages.length}`);



// for (let i = 0; i < petsPages.length; i++) {
//   slides[i] = document.createElement('div');
//   slides[i].classList.add('pets-slide');

//   for(let j = 0; j < petsPages[i].length; j++) {
//     currentCard = createCard(petsPages[i][j]);
//     slides[i].append(currentCard);
//   }
//   petsContainer.append(slides[i]);
// }

// slides[0].classList.add('active');



function createCard(pet) {
  let card = document.createElement('div');
  card.classList.add('pet');
  card.innerHTML = 
  `<img src=${pet.img} alt=${pet.name} class="pet__image">	
  <div class="pet__name">${pet.name}</div>
  <a href="#" class="pet__btn">Learn more</a>`;
  return card;
}

let currentNumber = 0;
let nextCurrentNumber;

btnnext.addEventListener('click', function() {
  if(isEnabled) {
    nextCurrentNumber = currentNumber + 1;
    previousItem();
    btncurrent.innerHTML = `${nextCurrentNumber + 1}`;
    if(btnbegin.hasAttribute('disabled') && btnprev.hasAttribute('disabled')) {
      btnbegin.removeAttribute('disabled');
      btnprev.removeAttribute('disabled');
    }
    if(nextCurrentNumber === slides.length-1) {
      btnnext.setAttribute('disabled', '');
      btnend.setAttribute('disabled', '');
    }
  }
  
});

btnend.addEventListener('click', function() {
  if(isEnabled) {
    nextCurrentNumber = slides.length - 1;
    previousItem();
    btncurrent.innerHTML = `${nextCurrentNumber + 1}`;
    if(btnbegin.hasAttribute('disabled') && btnprev.hasAttribute('disabled')) {
      btnbegin.removeAttribute('disabled');
      btnprev.removeAttribute('disabled');
    }
    if(nextCurrentNumber === slides.length - 1) {
      btnnext.setAttribute('disabled', '');
      btnend.setAttribute('disabled', '');
    }
  }

});

btnprev.addEventListener('click', function() {
  if(isEnabled) {
    nextCurrentNumber = currentNumber - 1;
    nextItem();
    btncurrent.innerHTML = `${nextCurrentNumber + 1}`;
    if(btnnext.hasAttribute('disabled') && btnend.hasAttribute('disabled')) {
      btnnext.removeAttribute('disabled');
      btnend.removeAttribute('disabled');
    }
    if(nextCurrentNumber === 0) {
      btnbegin.setAttribute('disabled', '');
      btnprev.setAttribute('disabled', '');
    }
  }
 
});

btnbegin.addEventListener('click', function() {
  if(isEnabled) {
    nextCurrentNumber = 0;
    nextItem();
    btncurrent.innerHTML = `${nextCurrentNumber + 1}`;
    if(btnnext.hasAttribute('disabled') && btnend.hasAttribute('disabled')) {
      btnnext.removeAttribute('disabled');
      btnend.removeAttribute('disabled');
    }
    if(nextCurrentNumber === 0) {
      btnbegin.setAttribute('disabled', '');
      btnprev.setAttribute('disabled', '');
    }
  }
  
});




function previousItem() {
  hideItem('to-left');
  showItem('from-right');
}

function nextItem() {
  hideItem('to-right');
  showItem('from-left');
}

function hideItem(direction) {
  isEnabled = false;
  // console.log(`currentitem= ${currentNumber}`);
  // console.log(slides[currentNumber]);
  slides[currentNumber].classList.add(direction);
  slides[currentNumber].addEventListener('animationend', function() {
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  slides[nextCurrentNumber].classList.add('next', direction);
  slides[nextCurrentNumber].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;   
  });
  currentNumber = nextCurrentNumber;  
}


let lastWindowWidth = window.innerWidth;
let newWindowWidth;

window.addEventListener('resize', function() {
  newWindowWidth = window.innerWidth;
  if (lastWindowWidth >= 1280 && newWindowWidth >=1280) return;
  if (lastWindowWidth < 1280 && newWindowWidth < 1280 && lastWindowWidth >= 768 && newWindowWidth >= 768) return;
  if (lastWindowWidth < 768 && newWindowWidth < 768) {
    return;
  } else {

    console.log('resize');
    petsContainer.innerHTML = '';
     
    currentNumber = 0;
    btncurrent.innerHTML = '1';
    petsPages = [];
    slides = [];
    createPetsClone();

    console.log('createPetsClone');
    generateSlider();
    
  }
  lastWindowWidth = newWindowWidth;

});

// modal
let modal = document.querySelector('.modal');
let modalContent = document.querySelector('.modal-content');
let btnCloseModal = document.querySelector('.btn-close');
let modalCard;

let petsCards = document.querySelectorAll('.pet');
let petName;

petsCards.forEach((card) => {
  card.addEventListener('click', function(e) {
    if(e.target === card.querySelector('a')) {
      e.preventDefault();
    }
    petName = card.querySelector('.pet__name').innerHTML;
    modalCard = document.createElement('div');
    modalCard.classList.add('modal-card');
    for (let i = 0; i < pets.length; i++) {
      if(pets[i].name === petName) {
        modalCard.innerHTML = 
          `<div class="modal-image">
						<img src=${pets[i].img} alt=${pets[i].name}>
					</div>
					<div class="modal-text">
						<div class="modal-name">${pets[i].name}</div>
						<div class="modal-type">${pets[i].type} - ${pets[i].breed}</div>
						<div class="modal-description">${pets[i].description}</div>
						<ul class="modal-list">
							<li><span><strong>Age: </strong>${pets[i].age}</span></li>
							<li><span><strong>Inoculations: </strong>${pets[i].inoculations}</span></li>
							<li><span><strong>Diseases: </strong>${pets[i].diseases}</span></li>
							<li><span><strong>Parasites: </strong>${pets[i].parasites}</span></li>
						</ul>		
          </div>`;
         break; 
      }
    }

    modalContent.append(modalCard);
    modal.classList.remove('hide');
    modal.classList.add('show');
    // modal.pageY = window.pageYOffset;
       
    document.body.style.overflow = 'hidden';  



  });
});


modal.addEventListener('click', function(e) {
  // console.log(e.target);
  // console.log(e.currentTarget); 
  // console.log( btnCloseModal.style.borderColor);
  if (e.target === modal) {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.querySelector('.modal-card').remove();
    document.body.style.overflow = ''; 
  }
});

btnCloseModal.addEventListener('click', function() { 
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.querySelector('.modal-card').remove();
  document.body.style.overflow = ''; 
});


