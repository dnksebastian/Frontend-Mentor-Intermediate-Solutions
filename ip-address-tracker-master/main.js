// DOM Elements and global variables
const formElement = document.getElementById("ip-form");
const ipInputElement = document.getElementById("ip-input");
const submitBtnElement = document.getElementById("submit-btn");

const ipValueElement = document.getElementById("ip-value");
const locationValueElement = document.getElementById("location-value");
const timezoneValueElement = document.getElementById("timezone-value");
const ispValueElement = document.getElementById("isp-value");

let latitude;
let longitude;

// Functions

function submitForm(e) {
  e.preventDefault();
  console.log(ipInputElement.value);
  ipInputElement.value = "";
}

async function getUserIP() {
  await fetch("https://ipapi.co/json/")
    .then(function (response) {
      response.json().then((jsonData) => {

        const userIP = jsonData.ip;
        const userLocation = `${jsonData.city}, ${jsonData.country_code} ${jsonData.postal}`;

        const splitUTC = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;
        const userUTC = splitUTC(jsonData.utc_offset, ':', 3);
        const userTimezone = `UTC ${userUTC}`;
        // This adds a colon to the UTC offset response string

        const userISP = jsonData.org;

        const userLatitude = jsonData.latitude;
        const userLongitude = jsonData.longitude;

        ipValueElement.textContent = userIP;
        locationValueElement.textContent = userLocation;
        timezoneValueElement.textContent = userTimezone;
        ispValueElement.textContent = userISP;

        latitude = +userLatitude.toFixed(3);
        longitude = +userLongitude.toFixed(3);

        console.log(latitude, longitude);
        
        // console.log(jsonData);
        // console.log(userLatitude, userLongitude);
        // return [userLatitude, userLongitude];
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

getUserIP();

// fetch('https://ipapi.co/8.8.8.8/json/')
// .then(function(response) {
//   response.json().then(jsonData => {
//     console.log(jsonData);
//   });
// })
// .catch(function(error) {
//   console.log(error)
// });

// Event listeners

formElement.addEventListener("submit", submitForm);

const map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);