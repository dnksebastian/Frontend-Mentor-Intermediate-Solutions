// DOM Elements and global variables
const formElement = document.getElementById("ip-form");
const ipInputElement = document.getElementById("ip-input");
const submitBtnElement = document.getElementById("submit-btn");

const ipValueElement = document.getElementById("ip-value");
const locationValueElement = document.getElementById("location-value");
const timezoneValueElement = document.getElementById("timezone-value");
const ispValueElement = document.getElementById("isp-value");

const errorDialogElement = document.getElementById("error-alert");
const errorMsgElement = document.getElementById("error-msg");
const errorBtnElement = document.getElementById("error-btn");

// Functions

fetch("https://ipapi.co/json/")
  .then((res) => res.json())
  .then((data) => getMapData(data))
  .catch(function (error) {
    showErrorMsg(error);
  });

function getMapData(resData) {

  if (resData.error) {
    throw `${resData.reason}`;
  }

  const userIP = resData.ip;
  const userLocation = `${resData.city}, ${resData.country_code} ${resData.postal}`;

  if (resData.utc_offset) {
    const splitUTC = (str, sub, pos) =>
      `${str.slice(0, pos)}${sub}${str.slice(pos)}`;
    const userUTC = splitUTC(resData.utc_offset, ":", 3);
    const userTimezone = `UTC ${userUTC}`;
    // This adds a colon to the UTC offset response string
    
    timezoneValueElement.textContent = userTimezone;
  } else {
    timezoneValueElement.textContent = `${resData.timezone}`;
  }

  const userISP = resData.org;

  ipValueElement.textContent = userIP;
  locationValueElement.textContent = userLocation;
  ispValueElement.textContent = userISP;

  map.setView([resData.latitude, resData.longitude], 13);
  mapMarker.setLatLng([resData.latitude, resData.longitude]);
  // console.log(resData);
}

function submitForm(e) {
  e.preventDefault();

  const userInput = ipInputElement.value;

  validateInput(userInput);

  if (validateInput) {
    const fetchURL = `https://ipapi.co/${userInput}/json/`;

    fetch(fetchURL)
      .then((res) => res.json())
      .then((data) => getMapData(data))
      .catch(function (error) {
        showErrorMsg(error);
      });
  }

  ipInputElement.value = "";
}

function validateInput(input) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input)
  ) {
    return input;
  } else {
    return;
  }
}

function showErrorMsg(error) {
  errorDialogElement.showModal();
  errorMsgElement.textContent = error;
}

// Event listeners

formElement.addEventListener("submit", submitForm);

errorBtnElement.addEventListener("click", () => {
  errorDialogElement.close();
});

// Leaflet config

const map = L.map("map").setView([0, 0], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const mapIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [30, 40],
  popupAnchor: [0, -5],
});

const mapMarker = L.marker([0, 0], { icon: mapIcon }).addTo(map);
