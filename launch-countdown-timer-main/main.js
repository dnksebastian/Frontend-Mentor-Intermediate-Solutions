// DOM Elements

const daysTile = document.getElementById("days");
const hoursTile = document.getElementById("hours");
const minutesTile = document.getElementById("minutes");
const secondsTile = document.getElementById("seconds");

console.log(daysTile, hoursTile, minutesTile, secondsTile);

// Timer script

const visitTime = Date.now();
const targetTimestamp = visitTime + 10 * 24 * 60 * 60 * 1000;
const targetDate = new Date(targetTimestamp);

console.log(targetDate);

// Functions & Variables

const countTime = () => {
  const currentTime = Date.now();

  const days = Math.floor(
    targetDate / (24 * 60 * 60 * 1000) - currentTime / (24 * 60 * 60 * 1000)
  );

  let hours = Math.floor(
    (targetDate / (1000 * 60 * 60) - currentTime / (1000 * 60 * 60)) % 24
  );
  hours = hours < 10 ? `0${hours}` : hours;

  let minutes = Math.floor(
    (targetDate / (1000 * 60) - currentTime / (1000 * 60)) % 60
  );
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let seconds = Math.floor((targetDate / 1000 - currentTime / 1000) % 60);

  seconds = seconds < 10 ? `0${seconds}` : seconds;


  daysTile.textContent = days;
  hoursTile.textContent = hours;
  minutesTile.textContent = minutes;
  secondsTile.textContent = seconds;
};


// Event listeners & calls

// setInterval(countTime, 1000);