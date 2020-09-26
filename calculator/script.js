const numbers = document.querySelectorAll('.number'),
      operations = document.querySelectorAll('.operator'),
      decimalBtn = document.querySelector('#decimal'),
      clearBtns = document.querySelectorAll('.clear-btn'),
      display = document.querySelector('#display'),
      rootBtn = document.getElementById('root'),
      toggle = document.getElementById('toggle'),
      del = document.getElementById('del'),
      minus = document.getElementById('minus');
      

let MemoryCurrentNumber = 0, /* текущее значение введенное в табло */
    MemoryNewNumber = false, /* ввели новое число или нет, после знака + или - должно стать true */
    MemoryPendingOperation = '';/* Значение текущей операции */
    MemoryRoot = false; 


    // console.log (`MemoryNewNumber=${MemoryNewNumber}`);
    // console.log (`MemoryCurrentNumber=${MemoryCurrentNumber}`);
    // console.log (`MemoryPendingOperation=${MemoryPendingOperation}`);



for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', function(e) {
    pressNumber(e.target.textContent);
  });
}

for (let i = 0; i < operations.length; i++) {
  let operator = operations[i];
  
  operator.addEventListener('click', function() {
    pressOperation(operator.innerHTML);
  });
  // operator.addEventListener('click', function(e) {
  //   pressOperation(e.target.innerHTML);
  // });
}

for (let i = 0; i < clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function(e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);

rootBtn.addEventListener('click', function() {
  let local = parseFloat(display.value);
  if (local < 0) {
    display.value = "invalid input";
    MemoryNewNumber = true;
  } else {
    MemoryCurrentNumber = +((Math.sqrt(local)).toFixed(6))
    display.value = MemoryCurrentNumber;
    MemoryNewNumber = false;
    MemoryRoot = true;
  }
  // console.log (`MemoryNewNumber=${MemoryNewNumber}`);
  // console.log (`MemoryCurrentNumber=${MemoryCurrentNumber}`);
  // console.log (`MemoryPendingOperation=${MemoryPendingOperation}`);
});

toggle.addEventListener('click', toggler);



del.addEventListener('click', function() {
  if(!MemoryNewNumber) {
    let local = display.value;
    local = local.slice(0, local.length-1);
    display.value = local;
    if (local[local.length-1] == '.') {
      local = local.slice(0, local.length-1);
      display.value = local;
    }
    if (display.value === '' || display.value === '-' || display.value === '-0') {
      display.value = 0;
    }
  } else {
    display.value = 0;
  }  
});



function pressNumber(numb) {
  // console.log(`нажали цифру ${numb}`);
  
  if((MemoryNewNumber || MemoryRoot) && (display.value !== '-') ) {
    display.value = numb;
    MemoryNewNumber = false;
    MemoryRoot = false;
  } else {
    if(display.value === '0') {
      display.value = numb;
    } else {
      display.value += numb;
    }
  }
  console.log (`MemoryNewNumber=${MemoryNewNumber}`);
  console.log (`MemoryCurrentNumber=${MemoryCurrentNumber}`);
  console.log (`MemoryPendingOperation=${MemoryPendingOperation}`);
}




function pressOperation(op) {
  console.log(`нажали ${op}`);
  if ((display.value === '0' && op === '-') || (MemoryNewNumber && op === '-')) {
    display.value = '-';
    MemoryNewNumber = false;
    return;
 }

  let localOperationMemory = parseFloat(display.value); /* показывает какое число на табло в момент нажатия операции */
  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;


    
  } else {
    MemoryNewNumber = true;  

    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber = (MemoryCurrentNumber*1000 + localOperationMemory*1000)/1000;
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber = (MemoryCurrentNumber*1000 - localOperationMemory*1000)/1000;
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber = ((MemoryCurrentNumber*1000)/1000) * ((localOperationMemory*1000)/1000);
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber = (MemoryCurrentNumber*1000) / (localOperationMemory*1000);
    }else if (MemoryPendingOperation === 'x<sup>y</sup>') {
      MemoryCurrentNumber = Math.pow(MemoryCurrentNumber,localOperationMemory)  
    }else {
      MemoryCurrentNumber = localOperationMemory;
    };

    if(isNaN(MemoryCurrentNumber)) {
      display.value = 'invalid input';
    } else {
      display.value = +MemoryCurrentNumber.toFixed(6);
    }
    MemoryPendingOperation = op;
  };

  console.log (`MemoryNewNumber=${MemoryNewNumber}`);
  console.log (`MemoryCurrentNumber=${MemoryCurrentNumber}`);
  console.log (`MemoryPendingOperation=${MemoryPendingOperation}`);
}

function decimal () {
  console.log(`нажали точку`);
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if(localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;  
  // console.log (`MemoryNewNumber=${MemoryNewNumber}`);
  // console.log (`MemoryCurrentNumber=${MemoryCurrentNumber}`);
  // console.log (`MemoryPendingOperation=${MemoryPendingOperation}`);
}

function clear(id) {
  if (id === 'ce') {
    console.log(`нажали се`);
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    console.log(`нажали с`);
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
  // console.log (`MemoryNewNumber=${MemoryNewNumber}`);
  // console.log (`MemoryCurrentNumber=${MemoryCurrentNumber}`);
  // console.log (`MemoryPendingOperation=${MemoryPendingOperation}`);
}

function toggler() {
  let a = parseFloat(display.value);
  if (a > 0) {
    display.value= '-' + a;
     
  } else if (a < 0) {
    display.value = Math.abs(a);
     
  };
  // console.log (`MemoryNewNumber=${MemoryNewNumber}`);
  // console.log (`MemoryCurrentNumber=${MemoryCurrentNumber}`);
  // console.log (`MemoryPendingOperation=${MemoryPendingOperation}`);
}
