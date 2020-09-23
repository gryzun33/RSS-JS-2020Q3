const numbers = document.querySelectorAll('.number'),
      operations = document.querySelectorAll('.operator'),
      decimalBtn = document.querySelector('#decimal'),
      clearBtns = document.querySelectorAll('.clear-btn'),
      display = document.querySelector('#display');
let MemoryCurrentNumber = 0, /* текущее значение введенное в табло */
    MemoryNewNumber = false, /* ввели новое число или нет, после знака + или - должно стать true */
    MemoryPendingOperation = ''; /* Значение текущей операции */


for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', function(e) {
    pressNumber(e.target.textContent);
  });
}

for (let i = 0; i < operations.length; i++) {
  let operator = operations[i];
  operator.addEventListener('click', function(e) {
    pressOperation(e.target.textContent);
  });
}

for (let i = 0; i < clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function(e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);

function pressNumber(numb) {
  // console.log(`MemoryNewNumber before= ${MemoryNewNumber}`);
  // console.log(`MemoryCurrentNumber before = ${MemoryCurrentNumber}`);
  // console.log(`MemoryPendingOperation before = ${MemoryPendingOperation}`);
  // console.log(`нажали на ${numb}`);
  
  if(MemoryNewNumber) {
    display.value = numb;
    MemoryNewNumber = false;
  } else {
    if(display.value === '0') {
      display.value = numb;
    } else {
      display.value += numb;
    }
  }
  // console.log(`MemoryNewNumber after= ${MemoryNewNumber}`);
  // console.log(`MemoryCurrentNumber after= ${MemoryCurrentNumber}`);
  // console.log(`MemoryPendingOperation after= ${MemoryPendingOperation}`); 
}

function pressOperation(op) {
  // console.log(`MemoryNewNumber before= ${MemoryNewNumber}`);
  // console.log(`MemoryCurrentNumber before= ${MemoryCurrentNumber}`);
  // console.log(`MemoryPendingOperation before= ${MemoryPendingOperation}`);
  // console.log(`нажали на ${op}`);
  

  let localOperationMemory = parseFloat(display.value); /* показывает какое число на табло в момент нажатия операции */
  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += localOperationMemory;
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= localOperationMemory;
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= localOperationMemory;
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= localOperationMemory;
    } else {
      MemoryCurrentNumber = localOperationMemory;
    };
    
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;

  };
//   console.log(`MemoryNewNumber after= ${MemoryNewNumber}`);
//   console.log(`MemoryCurrentNumber after= ${MemoryCurrentNumber}`);
//   console.log(`MemoryPendingOperation after= ${MemoryPendingOperation}`);
}

function decimal () {
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
}

function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}
