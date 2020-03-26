let soal = {
  1 : {
    soal: 'Aku digunakan untuk melakukan perulangan.',
    hint: 'Terdiri dari 3 huruf.',
    jawaban: 'FOR'
  },
  2 : {
    soal: 'Aku hanya digunakan untuk mendeklarasikan nilai konstanta.',
    hint: 'Terdiri dari 4 huruf.',
    jawaban: 'CONST'
  },
  3 : {
    soal: 'Aku biasannya digunakan untuk keluar dari sebuah perulangan.',
    hint: 'Terdiri dari 5 huruf.',
    jawaban: 'BREAK'
  },
  4 : {
    soal: 'Aku biasannya digunakan untuk memecah string menjadi array berdasarkan karakter pemisahnya.',
    hint: 'Terdiri dari 5 huruf.',
    jawaban: 'SPLIT'
  },
  5 : {
    soal: 'Aku merupakan sebuah teknik, aku akan terus memanggil diriku sendiri.',
    hint: 'Terdiri dari 9 huruf.',
    jawaban: 'RECURSIVE'
  }
}
const trueSymbol = '<span style="color:green;">&#10004</span>';
const wrongSymbol = '&#10060';
let countDown;
let maxSoal = 5;
let description = document.getElementById('description');
let listSoal = [];
let currentPoints = document.getElementById('points');
let timer = document.getElementById('timer');
let inputJawaban = document.getElementById('jawaban').children[0];
let buttonJawaban = document.getElementById('jawaban').children[1];
let buttonHint = document.getElementById('jawaban').children[2];
let currentSoal;
randomSoal();
document.body.onload = gamePlay(listSoal);
function submitJawaban(soal){
  buttonJawaban.classList.add('hidden');
  buttonHint.classList.add('hidden');
  setTimeout(function(){gamePlay(listSoal)},2000);
  if(soal.jawaban === inputJawaban.value.toUpperCase()){
    clearInterval(countDown);
    timer.innerHTML = trueSymbol;
    tambahPoint();
  }else{
    clearInterval(countDown);
    timer.innerHTML = wrongSymbol;
    kurangPoint();
  }
}
function tampilDescription(idSoal){
  reset();
  let textSoal = idSoal.soal;
  let soalnya = description.children[0];
  let i = 0;
  inputJawaban.style.width = ( idSoal.jawaban.length * 35 )+'px';
  inputJawaban.focus();
  soalnya.classList.add('cursor');
  let typing = setInterval(function(){
    if(soalnya.innerHTML.length === textSoal.length){
      clearInterval(typing);
      soalnya.classList.remove('cursor');
      startTimer();
      buttonJawaban.classList.remove('hidden');
      buttonHint.classList.remove('hidden');
    }else{
      soalnya.innerHTML = soalnya.innerHTML + textSoal[i];
      i++;
    }
  },100)
}
function tampilHint(idSoal){
  let textSoal = idSoal.hint;
  let soalnya = description.children[1];
  soalnya.classList.add('cursor');
  buttonHint.classList.add('hidden');
  let i = 0;
  let typing = setInterval(function(){
    if(soalnya.innerHTML.length === textSoal.length){
      clearInterval(typing);
      soalnya.classList.remove('cursor');
    }else{
      soalnya.innerHTML = soalnya.innerHTML + textSoal[i];
      i++;
    }
  },100)
}
function tambahPoint(){
  currentPoints.innerHTML = parseInt(currentPoints.innerHTML) + 20;
}
function kurangPoint(){
  currentPoints.innerHTML = parseInt(currentPoints.innerHTML) - 5;
}
function startTimer() {
  let time = 30;
  countDown = setInterval(function(){
    if(time < 1){
      clearInterval(countDown);
      timer.innerHTML = wrongSymbol;
      kurangPoint();
      buttonJawaban.classList.add('hidden');
      buttonHint.classList.add('hidden');
      setTimeout(function(){gamePlay(listSoal)},2000);
    }else{
      timer.innerHTML = time;
      time--;
    }
  },1000);
}
function gamePlay(lists){
  if(lists.length === 0){
    alert('game over');
  }else{
    let i = lists.shift();
    currentSoal = soal[i];
    tampilDescription(currentSoal);
  }
}
function randomSoal(){
  let listID = Object.keys(soal);
  while(listSoal.length<maxSoal){
    let random = Math.floor(Math.random()*listID.length);
    let getId = listID.splice(random,1);
    listSoal.push(getId);
  }
}
function reset(){
  timer.innerHTML = '';
  inputJawaban.value = '';
  description.children[0].innerHTML = '';
  description.children[1].innerHTML = '';
}
