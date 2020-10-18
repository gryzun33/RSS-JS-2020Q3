// ' use strict'

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

const burger = document.querySelector('.burger-menu');
const menuMobile = document.getElementById('menu');
const darkBackground = document.createElement('div');
const mainLink = document.getElementById('main-link');

// burger-menu

document.body.prepend(darkBackground);

burger.addEventListener('click', function() {
  if(!burger.classList.contains('burger-menu-show')) {
    burger.classList.add('burger-menu-show');
    menuMobile.classList.add('menu-show');
    burger.classList.remove('burger-menu-hide');
    menuMobile.classList.remove('menu-hide');
    darkBackground.classList.toggle('dark');
    // document.body.style.overflowY = 'hidden';
   

  } else {
    burger.classList.add('burger-menu-hide');
    burger.classList.remove('burger-menu-show');
    menuMobile.classList.add('menu-hide');
    menuMobile.classList.remove('menu-show');
    darkBackground.classList.toggle('dark');
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
    // document.body.style.overflowY = '';
});

mainLink.addEventListener('click', function() {
  burger.classList.add('burger-menu-hide');
  burger.classList.remove('burger-menu-show');
  menuMobile.classList.add('menu-hide');
  menuMobile.classList.remove('menu-show');
  darkBackground.classList.toggle('dark');
  // document.body.style.overflowY = '';
});


// slider

let ourFriends = document.querySelector('.our-friends-pets');
let petsCurrentWrapper = document.querySelector('.slide-pets');

let petsNextWrapper;
const arrowLeft = document.querySelector('.btn-left');
const arrowRight = document.querySelector('.btn-right');

let currentSlide = [];
let cards = [];
let modalCards = [];
let isEnabled = true;

pets.forEach(pet => {
  cards.push(createCard(pet));
});

// pets.forEach(pet => {
//   modalCards.push(createModalCard(pet))
// });




// first start
if (currentSlide.length === 0) {
  generateSlide(petsCurrentWrapper);
}


// generate slide
function generateSlide(wrapper) {
  // console.log(`currentslide= ${currentSlide}`);
  // console.log(`вызвали generateSlide`);
  // console.log(`slide = ${slide}, wrapper= ${wrapper}`);
  let slide = [];
  if (window.innerWidth >= 1280) {
    slide = randomizer(currentSlide, 3);
  } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    slide = randomizer(currentSlide, 2);
  } else {
    slide = randomizer(currentSlide, 1);
  }
  // console.log(`slide length = ${slide.length}`);s
  for (let i = 0; i < slide.length; i++) {
    wrapper.append(cards[slide[i]]);
  };
  // console.log(`в конце generateslide`);
  // console.log(`slide = ${slide}, wrapper= ${wrapper}`);
  currentSlide = slide;
}


// randomizer
function randomizer(currentArr, currentLength) {
  // console.log(`вызвали рандомайзер`);
  // console.log(`currentArr= ${currentArr}`);
  
  
  let localnextArr = [];
  let currentNumber;

  while (localnextArr.length < currentLength) {
    currentNumber = Math.floor(Math.random() * 10);
    if ((currentNumber < 8) && !localnextArr.includes(currentNumber) && !currentArr.includes(currentNumber)) {
      localnextArr.push(currentNumber);
    }  
  }
  // console.log(`nextarr= ${localnextArr}`);
  return localnextArr;
}

function createCard(pet) {
  let card = document.createElement('div');
  card.classList.add('pet');
  card.innerHTML = 
  `<img src=${pet.img} alt=${pet.name} class="pet__image">	
  <div class="pet__name">${pet.name}</div>
  <a href="#" class="pet__btn">Learn more</a>`;
  return card;
}



// slider

arrowLeft.addEventListener('click', function() {
  
 
  if(isEnabled) {
    petsNextWrapper = document.createElement('div');
    petsNextWrapper.classList.add('slide-pets');
    generateSlide(petsNextWrapper);
    ourFriends.append(petsNextWrapper);
    nextItem();
  }
});

arrowRight.addEventListener('click', function() {
   
  if(isEnabled) {
    petsNextWrapper = document.createElement('div');
    petsNextWrapper.classList.add('slide-pets');
    generateSlide(petsNextWrapper);
    ourFriends.append(petsNextWrapper);
    previousItem();
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
  petsCurrentWrapper.classList.add(direction);
  petsCurrentWrapper.addEventListener('animationend', function() {
    this.classList.remove('active', direction); 
    document.querySelector('.slide-pets').remove();  
  });
}

function showItem(direction) {
  petsNextWrapper.classList.add('next', direction);
  petsNextWrapper.addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true; 
    petsCurrentWrapper = petsNextWrapper;   
  });

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
    petsCurrentWrapper.innerHTML = '';
    generateSlide(petsCurrentWrapper);
  }
  lastWindowWidth = newWindowWidth;

});




// pop-up

let modal = document.querySelector('.modal');
let modalContent = document.querySelector('.modal-content');
let btnCloseModal = document.querySelector('.btn-close');
let modalCard;



cards.forEach((card, i) => {
  card.addEventListener('click', function(e) {
    if(e.target === card.querySelector('a')) {
      e.preventDefault();
    }
    modalCard = document.createElement('div');
    modalCard.classList.add('modal-card');
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
    modalContent.append(modalCard);
    modal.classList.remove('hide');
    modal.classList.add('show');
    // modal.pageY = window.pageYOffset;
       
    document.body.style.overflow = 'hidden';       
  });
});

// modal.addEventListener('mouseover', function(e) {
//   // console.log(e.target);
//   // console.log(e.currentTarget); 
//   // console.log( btnCloseModal.style.borderColor);
//   if (e.target === modal) {
//     btnCloseModal.style.background = '#FDDCC4';
//     btnCloseModal.style.borderColor = '#FDDCC4';
//   } else {
//     btnCloseModal.style.background = '';
//     btnCloseModal.style.borderColor = '#F1CDB3';
//   }
// });

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

// btnCloseModal.addEventListener('mouseover', function() {
//   btnCloseModal.style.background = '#FDDCC4';
//   btnCloseModal.style.borderColor = '#FDDCC4';
// });



btnCloseModal.addEventListener('click', function() { 
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.querySelector('.modal-card').remove();
  document.body.style.overflow = ''; 
});

// modalContent.addEventListener('mouseover', function() {
//   btnCloseModal.style.background = '';
//   btnCloseModal.style.borderColor = 'green';
//     console.log( btnCloseModal.style.borderColor);
// });
