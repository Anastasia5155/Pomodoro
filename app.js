const timerDisplay = document.getElementById('timer-display');
const timerRange = document.getElementById('timer-range');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const restartBtn = document.getElementById('restart');
const focusFor = document.getElementById('focus-for');
const s = document.getElementById('minute');
const sh = document.getElementById('sh-break');
const lg = document.getElementById('lg-break');
const wor = document.getElementById('work');
const sw = document.getElementById('sw');
let remainingSecs = 0;
let timerID;
let isRunning = false;
let initialRemainingSecs = 0;  


function startTimer(seconds) {
  initialRemainingSecs = seconds;
  remainingSecs = seconds;
  updateTimerDisplay();
  isRunning = true;

  timerID = setInterval(() => {
    remainingSecs--;
    updateTimerDisplay();

    if (remainingSecs === 0) {
      clearInterval(timerID);
      isRunning = false;
    }
  }, 1000);
}


function stopTimer() {
  clearInterval(timerID);
  isRunning = false;
}


function restartTimer() {
  remainingSecs = initialRemainingSecs;
  const mins = Math.floor(initialRemainingSecs / 60);
  timerRange.value = mins;
  updateTimerDisplay();
}


function updateTimerDisplay() {
  const mins = Math.floor(remainingSecs / 60);
  const secs = remainingSecs % 60;
  const displayStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  timerDisplay.textContent = displayStr;
  if (sw.textContent.includes('Work')) { 
    focusFor.textContent = `focus for  ${mins}`;
   if (mins<=1){
      s.textContent=`minute`
    }
    else{
      s.textContent=`minutes`
    }
  }
  timerRange.value = mins;
  
}

function short(){
sw.textContent=`Short break`;
focusFor.textContent=`Take a short break `
s.style.display = 'none';
}
function long(){
sw.textContent=`Long break`;
focusFor.textContent=`Take a long break `
s.style.display = 'none';
}
function work(){
  const mins = Math.floor(remainingSecs / 60);
  sw.textContent=`Work`;
  focusFor.textContent = `focus for  ${mins}`;
   if (mins<=1){
      s.textContent=`minute`
    }
    else{
      s.textContent=`minutes`
    }
}

wor.addEventListener('click',()=>{
  work();
  remainingSecs = 1500;
  updateTimerDisplay();
})

sh.addEventListener('click', () => {
  short();
  remainingSecs = 300;
  updateTimerDisplay();
});

lg.addEventListener('click', () => {
  long();
  remainingSecs = 900;
  updateTimerDisplay();
});


timerRange.addEventListener('input', () => {
  remainingSecs = timerRange.value * 60;
  updateTimerDisplay();
});


startBtn.addEventListener('click', () => {
  console.log('Start button clicked!');
  if (!isRunning) {
    startTimer(remainingSecs);
  }

});


stopBtn.addEventListener('click', () => {
  if (isRunning) {
    stopTimer();
  }
});


restartBtn.addEventListener('click', () => {
  if (!isRunning) {
    remainingSecs = timerRange.value * 60;
    restartTimer();
  }
});



  remainingSecs = 1500; 

updateTimerDisplay();

const addBtn = document.getElementById('add-btn');
const newItemInput = document.getElementById('new-item-input');
const listContainer = document.getElementById('list-container');

addBtn.addEventListener('click', () => {
  const newItemText = newItemInput.value;
  if (newItemText) {
    const newItem = document.createElement('li');
    const newCheckboxInput = document.createElement('input');
    newCheckboxInput.type = 'checkbox';
    newCheckboxInput.name = 'r';
   
    newItem.appendChild(newCheckboxInput);

    const newSpan = document.createElement('span'); 
    newSpan.textContent = newItemText;
    newItem.appendChild(newSpan);

    listContainer.appendChild(newItem);
    newItemInput.value = '';
  }
});


listContainer.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'LI') {
    const currentText = target.textContent;
    target.innerHTML = `
      <input type="text" class="edit-input" value="${currentText}">
      <button class="save-btn">Safe</button>
      <button class="cancel-btn">Cancel</button>
      <button class="delete-btn">Delete</button>
    `;
   
    target.dataset.previousValue = currentText;
  } else if (target.classList.contains('delete-btn')) {
    const currentLi = target.parentNode;
    listContainer.removeChild(currentLi);
  } else if (target.classList.contains('cancel-btn')) {
    const currentLi = target.parentNode;
    const previousValue = currentLi.dataset.previousValue;
    const checkboxInput = document.createElement('input'); 
    checkboxInput.type = 'checkbox';
    checkboxInput.name = 'r';
    const newText = document.createTextNode(previousValue.trim()); 
    currentLi.innerHTML = '';
    currentLi.appendChild(checkboxInput);
    currentLi.appendChild(newText);
  }
});

listContainer.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('save-btn')) {
    const currentLi = target.parentNode;
    const input = currentLi.querySelector('.edit-input');
    const newText = input.value.trim();
    if (newText !== '') {
      currentLi.innerHTML = `<input type="checkbox" name="r"> ${newText}`;
    } else {
      input.classList.add('error');
    }
  } else if (target.classList.contains('cancel-btn')) {
    const currentLi = target.parentNode;
    const previousValue = currentLi.dataset.previousValue;
    currentLi.innerHTML = previousValue;
  }
});

