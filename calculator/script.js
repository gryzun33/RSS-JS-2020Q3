const numbers = document.querySelectorAll('.number'),
      operations = document.querySelectorAll('.operator'),
      decimalBtn = document.querySelector('#decimal'),
      clearBtns = document.querySelectorAll('.clear-btn'),
      display = document.querySelector('#display'),
      rootBtn = document.getElementById('root'),
      toggle = document.getElementById('toggle'),
      del = document.getElementById('del');
      

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

rootBtn.addEventListener('click', function() {
  let local = parseFloat(display.value);
  if (local < 0) {
    display.value = "invalid input";
    MemoryNewNumber = true;
  } else {
    MemoryCurrentNumber = +((Math.sqrt(local)).toFixed(6))
    display.value = MemoryCurrentNumber;
    MemoryNewNumber = true;
  }
});

toggle.addEventListener('click', function() {
  let a = parseFloat(display.value);
  if (a > 0) {
    display.value= -a;
     
  } else if (a < 0) {
    display.value = Math.abs(a);
     
  };
});

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
  }  
})

function pressNumber(numb) {
  console.log(`op=${MemoryPendingOperation}`);
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
  
}

function pressOperation(op) {

  let localOperationMemory = parseFloat(display.value); /* показывает какое число на табло в момент нажатия операции */
  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;


    // if(MemoryPendingOperation === '-') {
    //      MemoryCurrentNumber = "-";
    //   display.value = MemoryCurrentNumber;
    // };

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
    }else if (MemoryPendingOperation === 'xy') {
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


