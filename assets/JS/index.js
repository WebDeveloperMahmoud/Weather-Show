let toggle = document.querySelector(".navbar-toggler");
let iconBars = document.querySelector(".icon-bars");
let iconStaggered = document.querySelector(".icon-staggered");
let navBar = document.querySelector(".navbar");
let container = document.querySelector(".container");
let isOpen = false;

toggle.addEventListener("click", function () {
    if (isOpen) {
        iconBars.classList.remove("d-none");
        iconStaggered.classList.add("d-none");
        navBar.classList.remove("open")
        navBar.classList.add("close");
    } else {
        iconBars.classList.add("d-none");
        iconStaggered.classList.remove("d-none");
        navBar.classList.add("open");
    }
    isOpen = !isOpen;
})

let navLinks = document.querySelectorAll(".nav-link");
let currentPage = window.location.pathname.split("/").pop();
navLinks.forEach((navLink) => {
    let href = navLink.getAttribute("href");
    if (href === currentPage) {
        navLink.classList.add("active");
    } else {
        navLink.classList.remove("active");
    }
})

let day = document.querySelectorAll(".day");
let date = document.querySelector(".date");
let city = document.querySelector(".city");
let temps = document.querySelectorAll(".temp");
let temp1 = document.querySelector(".temp-1");
let temp2 = document.querySelector(".temp-2");
let temp3 = document.querySelector(".temp-3");
let weatherLogo = document.querySelectorAll(".weather-logo");
let PartlyCloudy = document.querySelector(".Partly-Cloudy");
let umbrella = document.querySelector(".umbrella");
let wind = document.querySelector(".wind");
let compass = document.querySelector(".compass");
let temp6h_1 = document.querySelector(".temp6h-1");
let temp6h_2 = document.querySelector(".temp6h-2"); 
let status1 = document.querySelector(".status1");
let status2 = document.querySelector(".status2");


async function getData(location) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let now = new Date();
    date.textContent = `${now.getDate()}${months[now.getMonth() % 12]}`;
    for (let i = 0; i < day.length; i++){
        day[i].textContent = `${days[(now.getDay() + i) % 7]}`;
    }
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=69a89a32c2b24c61a1e174217252011&q=${location}&days=3`);
    response = await response.json();
    city.textContent = `${response.location.name}`;
    let forecastday = response.forecast.forecastday;
    for (let i = 0; i < temps.length; i++){
        temps[i].textContent = `${forecastday[i].hour[now.getHours()].temp_c}°C`;
    }
    for (let j = 0; j < weatherLogo.length; j++){
        weatherLogo[j].src = `${forecastday[j].hour[now.getHours()].condition.icon}`;
    }
    PartlyCloudy.textContent = forecastday[0].hour[now.getHours()].condition.text;
    umbrella.textContent = `${forecastday[0].hour[now.getHours()].humidity}%`;
    wind.textContent = `${forecastday[0].hour[now.getHours()].wind_kph}km/h`;
    compass.textContent = `${forecastday[0].hour[now.getHours()].wind_dir}`;
    temp6h_1.textContent = `${forecastday[1].hour[6].temp_c}°`;
    temp6h_2.textContent = `${forecastday[2].hour[6].temp_c}°`;
    status1.textContent = `${forecastday[1].hour[now.getHours()].condition.text}`;
    status2.textContent = `${forecastday[2].hour[now.getHours()].condition.text}`;
}
getData("cairo");

let locationInput = document.querySelector(".location-input");
let findButton = document.querySelector(".find-button");

function searchLocation() {
    locationInput.addEventListener("keyup", function () {
        getData(this.value);
    });

    findButton.addEventListener("click", function () {
        getData(locationInput.value);
    });
}
searchLocation();

let form = document.querySelector("form");
let subscribeInput = document.querySelector(".subscribe-input");
let error = document.querySelector(".error");
let success = document.querySelector(".success");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = subscribeInput.value.trim().toLowerCase();
    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(emailReg.test(email));
    if (email === "" || !emailReg.test(email)) {
        error.classList.remove("d-none");
        success.classList.add("d-none");
    }
    else {
        success.classList.remove("d-none");
        error.classList.add("d-none");
        clearInputAftersubscribe();
    }
})
function clearInputAftersubscribe() {
    subscribeInput.value = "";
}

let copyRights = document.querySelectorAll(".copy-right");
let year = new Date();
copyRights.forEach((copyRight) => {
    copyRight.textContent = `${year.getFullYear()}`;
})