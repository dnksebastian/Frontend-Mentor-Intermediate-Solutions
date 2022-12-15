// DOM Elements

const daysTile = document.getElementById("days");
const hoursTile = document.getElementById("hours");
const minutesTile = document.getElementById("minutes");
const secondsTile = document.getElementById("seconds");

// Timer functions

const currentDate = new Date();
const targetDate = new Date(currentDate);
targetDate.setDate(targetDate.getDate() + 10);

const timeBetween = (targetDate - currentDate) / 1000;

// console.log(currentDate);
// console.log(targetDate);
// console.log(timeBetween);

let preTime;

setInterval(() => {
  const current = new Date();
  const timeBetweenDates = Math.ceil((targetDate - current) / 1000);

  flipAll(timeBetweenDates);

  preTime = timeBetweenDates;
}, 250);

function flipAll(timeBetween) {
  let day = Math.floor(timeBetween / (24 * 60 * 60)) % 24;
  let hour = Math.floor(timeBetween / (60 * 60)) % 60;
  hour = hour < 10 ? `0${hour}` : hour;
  let min = Math.floor(timeBetween / 60) % 60;
  min = min < 10 ? `0${min}` : min;
  let sec = timeBetween % 60;
  sec = sec < 10 ? `0${sec}` : sec;

  flip(daysTile, day);
  flip(hoursTile, hour);
  flip(minutesTile, min);
  flip(secondsTile, sec);
}

function flip(flipTile, newNumber) {
  const topHalf = flipTile.querySelector(".top-flipcard");
  let startNumber = parseInt(topHalf.textContent);

  if (flipTile !== daysTile) {
    startNumber = startNumber < 10 ? `0${startNumber}` : startNumber;
  }

  if (newNumber === startNumber) return;

  const bottomHalf = flipTile.querySelector(".bot-flipcard");

  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bot-flip");

  topHalf.textContent = startNumber;
  bottomHalf.textContent = startNumber;
  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", (e) => {
    topHalf.textContent = newNumber;
  });

  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });

  bottomFlip.addEventListener("animationend", (e) => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });

  flipTile.append(topFlip, bottomFlip);
}
