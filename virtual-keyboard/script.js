const keyLayout1 = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
":)","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]","(:",
"caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", 
"shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "enter",
"done","lang","space","voice","sound","arrowleft","arrowright"];

const keyLayout2 = [ "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
":)","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}","(:",
"caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", " \" ", "|", 
"shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "enter",
"done","lang","space","voice","sound","arrowleft","arrowright"];

const keyLayout3 = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
":)","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ","(:",
"caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "ё", 
"shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "/", "enter",
"done","lang","space","voice","sound","arrowleft","arrowright"];

const keyLayout4 = [ "!", '"', "№", "%", ":", ",", ".", ";", "(", ")", "_", "+", "backspace",
":)","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ","(:",
"caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "ё", 
"shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?", "enter",
"done","lang","space","voice","sound","arrowleft","arrowright"];

const functionalButtons = ['Tab', 'CapsLock', 'Shift', 'Control', 'Alt', 'Meta', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Backspace', ''];

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

let left = '';
let right = '';



const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    shiftBtn: null,
    capsBtn: null,
    langBtn: null,
    soundBtn: null,
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    lang: "en",
    sound: false,
    voice: false,
  },

  init() {
    
    // create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys()); 

   

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    // console.log(this.elements.keys);

    // add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // use virtual keyboard for input
    document.querySelectorAll('.use-keyboard-input').forEach(element => {
      element.addEventListener('focus', () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        })
      });
    });
   
    
    
    document.querySelector('.use-keyboard-input').addEventListener('keydown', (e) => {
      //  console.log (`e.key=${e.key}`) ;
      if (functionalButtons.indexOf(e.key) === -1) {
        left = left + e.key;
        this.properties.value = left + right;
        // this.properties.value = this.properties.value + e.key;
        // console.log(this.properties.value);
      }
      
      for (let key of this.elements.keys) {
        if ((key.innerText.toLowerCase() === e.key.toLowerCase()) && functionalButtons.indexOf(e.key) === -1) {
          key.classList.add('light');
          setTimeout(() => key.classList.remove('light'), 500);

        } else if (key.innerText === 'backspace' && e.key === 'Backspace'){
          key.classList.add('light');

          left = left.substring(0, left.length - 1);
          this.properties.value = left + right;
      
          // this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
          // this._triggerEvent('oninput');
          document.querySelector('.use-keyboard-input').focus();
          setTimeout(() => key.classList.remove('light'), 500);

        } else if (key.innerText === 'keyboard_capslock' && e.key === 'CapsLock') {
          // console.log (e.key);
          key.classList.add('light');
          this._toggleCapsLock();     
          this.elements.capsBtn.classList.toggle("keyboard__key--active");      
          document.querySelector('.use-keyboard-input').focus();
          setTimeout(() => key.classList.remove('light'), 500);

        } else if (key.innerText === 'keyboard_return' && e.key === 'Enter') {
          key.classList.add('light');

          left = left + '\n';
          this.properties.value = left + right;
          // this.properties.value += '\n';
          // this._triggerEvent('oninput');
          document.querySelector('.use-keyboard-input').focus();
          setTimeout(() => key.classList.remove('light'), 500);

        } else if (key.innerText === 'Shift' && e.key === 'Shift') {
          key.classList.add('light');
          this._toggleShift();
          this.elements.shiftBtn.classList.toggle("keyboard__key--active");
          document.querySelector('.use-keyboard-input').focus();
          setTimeout(() => key.classList.remove('light'), 500);

        } else if (key.innerText === 'space_bar' && e.code === 'Space') {
          key.classList.add('light');
          // console.log (this.properties.value);
          this.properties.value += '';
          // this._triggerEvent('oninput');
          // console.log (left.length);
          document.querySelector('.use-keyboard-input').focus();
          setTimeout(() => key.classList.remove('light'), 500);

        } else if ((key.innerText === 'keyboard_arrow_left' && e.key === 'ArrowLeft') || (key.innerText === 'keyboard_arrow_right' && e.key === 'ArrowRight') ) {
          key.classList.add('light');
          setTimeout(() => key.classList.remove('light'), 500);

        } 



      }      
    });


  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

   
    // const keyLayout1 = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
    // "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
    // "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", 
    // "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "enter",
    // "done","lang","space","voice","arrowleft","arrowright"];

    // const keyLayout2 = [ "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
    // "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
    // "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", " \" ", "|", 
    // "shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "enter",
    // "done","lang","space","voice","arrowleft","arrowright"];

    // create html for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    }

    keyLayout1.forEach((key, index) => {

      const keyElement = document.createElement('button');
      // ! ?????
      const insertLineBreak = ["backspace", "(:", "\\", "enter" ].indexOf(key) !== -1;

      // add attributes and classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.addEventListener('click', () => {

            left = left.substring(0, left.length - 1);
            this.properties.value = left + right;



            // this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);

            if (this.properties.sound) {
              this._playSound("backspace");
            }

            this._triggerEvent('oninput');

            document.querySelector('.use-keyboard-input').selectionStart = left.length;
            document.querySelector('.use-keyboard-input').selectionEnd = document.querySelector('.use-keyboard-input').selectionStart;
            document.querySelector('.use-keyboard-input').focus();
          });
          break;
        
        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          this.elements.capsBtn = keyElement;
          this.elements.capsBtn.addEventListener('click', () => {
            // this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._toggleCapsLock();


            if (this.properties.sound) {
              this._playSound("caps");
            }
         
            this.elements.capsBtn.classList.toggle("keyboard__key--active");
            // keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
            document.querySelector('.use-keyboard-input').focus();
          });
          break; 
          
        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          keyElement.addEventListener('click', () => {

            left = left + '\n';
            this.properties.value  = left + right;
            // this.properties.value += '\n';

            if (this.properties.sound) {
              this._playSound("enter");
            }
            this._triggerEvent('oninput');
            document.querySelector('.use-keyboard-input').selectionStart = left.length;
            document.querySelector('.use-keyboard-input').selectionEnd = document.querySelector('.use-keyboard-input').selectionStart;
            document.querySelector('.use-keyboard-input').focus();

          });
          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");
          keyElement.addEventListener('click', () => {

            left = left + ' ';
            this.properties.value = left + right;

            // this.properties.value += ' ';

            if (this.properties.sound) {
              if (this.elements.langBtn.innerHTML === `<span>en</span>`) {
                this._playSound("eng");
              } else {
                this._playSound("ru");
              }             
            }


            this._triggerEvent('oninput');

            document.querySelector('.use-keyboard-input').selectionStart = left.length;
            document.querySelector('.use-keyboard-input').selectionEnd = document.querySelector('.use-keyboard-input').selectionStart; 

            document.querySelector('.use-keyboard-input').focus();
          });
          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");
          keyElement.addEventListener('click', () => {
            this.close();
            this._triggerEvent('onclose');
          });
          break;

        case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = "<span>Shift</span>";
          this.elements.shiftBtn = keyElement;

          this.elements.shiftBtn.addEventListener('click', () => {
            // this._toggleCapsLock();
            this._toggleShift();

            if (this.properties.sound) {
              this._playSound("shift");
            }
            this.elements.shiftBtn.classList.toggle("keyboard__key--active");
            document.querySelector('.use-keyboard-input').focus();
          })
          break;
        
        case "lang":
          keyElement.innerHTML = `<span>en</span>`;
          this.elements.langBtn = keyElement;
          this.elements.langBtn.addEventListener('click', () => {
            // this.elements.keysContainer.innerHTML = '';
            // this.elements.keysContainer.appendChild(this._createKeys(keyLayout3, insertLineBreakRu, 'ru')); 
             
            this._toggleLang();



            if (this.properties.sound) {
              if (this.elements.langBtn.innerHTML === `<span>en</span>`) {
                this._playSound("eng");
              } else {
                this._playSound("ru");
              }             
            }
            document.querySelector('.use-keyboard-input').focus();
          })
          break;

        case "voice":
          keyElement.classList.add("keyboard__key--wide","keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("mic");
          
          keyElement.addEventListener('click', () => {
            this.properties.voice = !this.properties.voice;
            // console.log (`voice = ${this.properties.voice}`);
            if (this.properties.voice) {
              if (this.properties.sound) {
                this._playSound("voice");
              }
              
              if (this.elements.langBtn.innerHTML === `<span>en</span>`) {
                recognition.lang = 'en-US';
              } else {
                recognition.lang = 'ru';
              }  
           
              recognition.start();
           
              recognition.addEventListener("result", this.recResult);
              recognition.addEventListener("end", this.recEnd);

              // this.properties.value = left + right;
              // document.querySelector('.use-keyboard-input').selectionStart = document.querySelector('.use-keyboard-input').selectionStart + 1;
              // document.querySelector('.use-keyboard-input').selectionEnd = document.querySelector('.use-keyboard-input').selectionStart;

              
            } else {
              recognition.abort();
              recognition.removeEventListener("result", this.recResult);
              recognition.removeEventListener("end", this.recEnd);

              // console.log (`stop`);
            }
            this.properties.value = left + right;
            document.querySelector('.use-keyboard-input').selectionStart = document.querySelector('.use-keyboard-input').selectionStart + 1;
            document.querySelector('.use-keyboard-input').selectionEnd = document.querySelector('.use-keyboard-input').selectionStart;
            document.querySelector('.use-keyboard-input').focus();
            keyElement.classList.toggle("keyboard__key--active");
          });
         
          break;


        case "sound":
          keyElement.classList.add("keyboard__key--wide","keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("volume_up");
          this.elements.soundBtn = keyElement;
          this.elements.soundBtn.addEventListener('click', () => {
      
            this.properties.sound = !this.properties.sound;
            if (this.properties.sound) {
              this._playSound("sound");
            }
            this.elements.soundBtn.classList.toggle("keyboard__key--active");
            document.querySelector('.use-keyboard-input').focus();
          })


          break;


        case "arrowleft":
          keyElement.innerHTML = createIconHTML("keyboard_arrow_left");
          
          keyElement.addEventListener('click', () => {

            if (this.properties.sound) {
              this._playSound("arrow");
            }

            
            
            // console.log(document.querySelector('.use-keyboard-input').selectionStart);
            document.querySelector('.use-keyboard-input').selectionStart = ((document.querySelector('.use-keyboard-input').selectionStart - 1) >= 0) ? 
            (document.querySelector('.use-keyboard-input').selectionStart - 1) : 0 ;
            document.querySelector('.use-keyboard-input').selectionEnd = document.querySelector('.use-keyboard-input').selectionStart;
            left = this.properties.value.substring(0, document.querySelector('.use-keyboard-input').selectionStart);
            right = this.properties.value.substring(document.querySelector('.use-keyboard-input').selectionStart, this.properties.value.length);
            // console.log (left);
            // console.log (right);
            // console.log (right.length);
            document.querySelector('.use-keyboard-input').focus();
            
          })
          break;

        case "arrowright":
          keyElement.innerHTML = createIconHTML("keyboard_arrow_right");
          keyElement.addEventListener('click', () => {
            if (this.properties.sound) {
              this._playSound("arrow");
            }
            
            // console.log(document.querySelector('.use-keyboard-input').selectionStart);
            document.querySelector('.use-keyboard-input').selectionStart = document.querySelector('.use-keyboard-input').selectionStart + 1;
            document.querySelector('.use-keyboard-input').selectionEnd = document.querySelector('.use-keyboard-input').selectionStart;
            document.querySelector('.use-keyboard-input').focus();
            left = this.properties.value.substring(0, document.querySelector('.use-keyboard-input').selectionStart);
            right = this.properties.value.substring(document.querySelector('.use-keyboard-input').selectionStart, this.properties.value.length);
            // console.log (left);
            // console.log (right);
            // console.log (right.length);
            
          })

          break;  

        default:
          
          keyElement.textContent = key.toLowerCase();
          
          keyElement.addEventListener('click', () => {
            // console.log(`value = ${this.properties.value} `);
            if (this.elements.langBtn.innerHTML === `<span>en</span>`) {

              if (this.properties.sound) {
                this._playSound("eng");
              }
              if (!this.properties.shift) {
                // this.properties.value += this.properties.capsLock ? keyLayout1[index].toUpperCase() : keyLayout1[index].toLowerCase();
                left = left + (this.properties.capsLock ? keyLayout1[index].toUpperCase() : keyLayout1[index].toLowerCase());
                this.properties.value = left + right;
              }
              if (this.properties.shift) {
                // this.properties.value += this.properties.capsLock ? keyLayout2[index].toUpperCase() : keyLayout2[index].toLowerCase();
                left = left + (this.properties.capsLock ? keyLayout2[index].toUpperCase() : keyLayout2[index].toLowerCase());
                this.properties.value = left + right;
              }
              

              
            } else if (this.elements.langBtn.innerHTML === `<span>ru</span>`){ 

              if (this.properties.sound) {
                this._playSound("ru");
              }
              if (!this.properties.shift) {
                // this.properties.value += this.properties.capsLock ? keyLayout3[index].toUpperCase() : keyLayout3[index].toLowerCase();
                left = left + (this.properties.capsLock ? keyLayout3[index].toUpperCase() : keyLayout3[index].toLowerCase());
                this.properties.value = left + right;
              }
              if (this.properties.shift) {
                // this.properties.value += this.properties.capsLock ? keyLayout4[index].toUpperCase() : keyLayout4[index].toLowerCase();
                left = left + (this.properties.capsLock ? keyLayout4[index].toUpperCase() : keyLayout4[index].toLowerCase());
                this.properties.value = left + right;
                
              }
            }
            
            
            this._triggerEvent('oninput');

            document.querySelector('.use-keyboard-input').selectionStart = left.length;
            document.querySelector('.use-keyboard-input').selectionEnd = document.querySelector('.use-keyboard-input').selectionStart;

            document.querySelector('.use-keyboard-input').focus();
          });
          break;
      }

      fragment.appendChild(keyElement);

      if(insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }

    });

    return fragment;
  },

  // !!! непонятная функция
  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
    
  },

  _toggleCapsLock() {
    // if (this.properties.capsLock && !this.elements.capsBtn.classList.contains("keyboard__key--active")) {
    //   this.properties.capsLock = true;
    // } else if (!this.properties.shift) {
    //   this.properties.capsLock = !this.properties.capsLock;
    // }

    // console.log (`shift = ${this.properties.shift}`);
    // console.log (`caps = ${this.properties.capsLock}`);

    if (this.properties.shift && this.elements.capsBtn.classList.contains("keyboard__key--active")) {
      this.properties.capsLock = true;
    } else {
      this.properties.capsLock = !this.properties.capsLock;
    }
    

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  _toggleShift() {
    // console.log(keyLayout2);
    // console.log(this.elements.keys);

    // if (!this.properties.capsLock && this.properties.shift) {
    //   this.properties.shift = !this.properties.shift;
    // } else {
    //   this.properties.shift = !this.properties.shift;
    //   this.properties.capsLock = !this.properties.capsLock; 
    // }
   

    // console.log (`shift = ${this.properties.shift}`);
    // console.log (`caps = ${this.properties.capsLock}`);
    // console.log(this.properties.shift);
    this.properties.shift = !this.properties.shift;
    this.properties.capsLock = !this.properties.capsLock; 

    if (this.elements.langBtn.innerHTML === "<span>en</span>") {
      for (let i = 0; i < this.elements.keys.length; i++) {
        if (keyLayout2[i] !== keyLayout1[i]) {
          this.elements.keys[i].textContent = this.properties.shift ? keyLayout2[i] : keyLayout1[i] ;
          // console.log(this.elements.keys[i].textContent);
        } else if (this.elements.keys[i].childElementCount === 0){
          // this.elements.keys[i].textContent = (this.elements.keys[i].textContent === this.elements.keys[i].textContent.toLowerCase()) ? this.elements.keys[i].textContent.toUpperCase() : this.elements.keys[i].textContent.toLowerCase();
          this.elements.keys[i].textContent = this.properties.capsLock ? this.elements.keys[i].textContent.toUpperCase() : this.elements.keys[i].textContent.toLowerCase();
        }
        
      }
    } else if (this.elements.langBtn.innerHTML === "<span>ru</span>") {
      for (let i = 0; i < this.elements.keys.length; i++) {
        if (keyLayout4[i] !== keyLayout3[i]) {
          this.elements.keys[i].textContent = this.properties.shift ? keyLayout4[i] : keyLayout3[i] ;
          // console.log(this.elements.keys[i].textContent);
        } else if (this.elements.keys[i].childElementCount === 0){
          // this.elements.keys[i].textContent = (this.elements.keys[i].textContent === this.elements.keys[i].textContent.toLowerCase()) ? this.elements.keys[i].textContent.toUpperCase() : this.elements.keys[i].textContent.toLowerCase();
          this.elements.keys[i].textContent = this.properties.capsLock ? this.elements.keys[i].textContent.toUpperCase() : this.elements.keys[i].textContent.toLowerCase();
        }
      }
     
    }
    
   
    
    
    // for (let i = 0; i < this.elements.keys)
  },

  _toggleLang() {
   


    if (this.elements.langBtn.innerHTML === "<span>en</span>") {
     
      this.elements.langBtn.innerHTML = "<span>ru</span>";

      
      for (let i = 0; i < this.elements.keys.length; i++) {
        if (this.elements.keys[i].childElementCount === 0) {
          if (this.properties.shift) {
            this.elements.keys[i].textContent = this.properties.capsLock ? keyLayout4[i].toUpperCase() : keyLayout4[i].toLowerCase() ;
          } else {
            this.elements.keys[i].textContent = this.properties.capsLock ? keyLayout3[i].toUpperCase() : keyLayout3[i].toLowerCase() ;
          }         
        }
      }
      if (this.properties.voice) {
        recognition.lang = 'ru';
      }
    } else {
      this.elements.langBtn.innerHTML = "<span>en</span>";
      // if (this.properties.voice) {
      //   recognition.lang = 'en-US';
      // }
      for (let i = 0; i < this.elements.keys.length; i++) {
        if (this.elements.keys[i].childElementCount === 0) {
          if (this.properties.shift) {
            this.elements.keys[i].textContent = this.properties.capsLock ? keyLayout2[i].toUpperCase() : keyLayout2[i].toLowerCase() ; 
          } else {
            this.elements.keys[i].textContent = this.properties.capsLock ? keyLayout1[i].toUpperCase() : keyLayout1[i].toLowerCase() ;
          }           
        }   
      }
      if (this.properties.voice) {
        recognition.lang = 'en-US';
      }
    }

    // for (const key of this.elements.keys) {
    //   if (key.childElementCount === 0) {
    //     key.addEventListener('click', () => {
    //       this.properties.value += this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
          
    //       this._triggerEvent('oninput');
    //       document.querySelector('.use-keyboard-input').focus();
    //     });
    //   }
    // }



  },

  _playSound(soundName) {
    const audio = document.querySelector(`audio[data-key="${soundName}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  },

  open(initialValue, oninput, onclose) {
    // console.log(`initialValue= ${initialValue}`);
    // console.log(`oninput=${oninput}`);
    // console.log(`onclose=${onclose}`);
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  },

  recResult(e) {
    console.log(`3=${recognition.lang}`); 

    text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    if (e.results[0].isFinal) {
      left = left + text + ' ';
      document.querySelector('body > textarea').value = left + right;
      // document.querySelector('body > textarea').value = document.querySelector('body > textarea').value + text + ' ';
    }

    // console.log (`text=${text}`);
       
  },

  recEnd() {   
    recognition.lang = recognition.lang;    
    console.log(`4=${recognition.lang}`);         
    // document.querySelector('body > textarea').value = document.querySelector('body > textarea').value + text + ' ';                  
  //   console.log (`start`); 
    recognition.start();
  //   // console.log(`5=${recognition.lang}`);
  //   text = '';
  //   // recognition.stop();
  },
  




};




window.addEventListener("DOMContentLoaded", function() {
  Keyboard.init();
});






// recognition.addEventListener("result", (e) => {

//   text = Array.from(e.results)
//   .map(result => result[0])
//   .map(result => result.transcript)
//   .join('');

//   console.log (`text=${text}`);

  
// });

 // recognition.addEventListener('end', (e) => {
            
          //   console.log (`end`);
          //   this.properties.value = this.properties.value + text;
          //   console.log (this.properties.value);
        
 

          //   console.log (`start`); 
          //   recognition.start();

          // });
 
