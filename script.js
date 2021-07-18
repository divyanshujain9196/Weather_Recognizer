Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@divyanshujain9196 
atishayj281
/
divyanshujain9196.github.io
forked from divyanshujain9196/divyanshujain9196.github.io
0
01
Code
Pull requests
Actions
Projects
Wiki
Security
Insights
divyanshujain9196.github.io/script.js /
@atishayj281
atishayj281 Error message resolved
Latest commit b4f2196 4 minutes ago
 History
 2 contributors
69 lines (54 sloc)  2.23 KB
  
const api = {
    key: "28fd15358cdecbc1a1dfef367e71acef",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput (event) {
    event.preventDefault();
    if (event.type == "click") {
        getData(search.value);
        console.log(search.value);
    }
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
        
}

function displayData (response) {
    // console.log(response);
    const error = document.querySelector(".error");
    if (response.cod === "404") {
        
        error.textContent = "Please enter a valid city";
        search.value = "";
    } else {
        error.textContent = "";
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

        const weather = document.querySelector(".weather");
        weather.innerText = `Weather: ${response.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

        const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";
    }
}

function dateFunction (d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete
