const apiKey = '6e3499d4af4a2278875c798906e0ca6f';  // Replace with your actual API key

function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  // Show loading spinner
  document.getElementById('loading').style.display = 'block';
  document.getElementById('weatherInfo').style.display = 'none'; // Hide weather info while loading

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        alert('City not found!');
        document.getElementById('loading').style.display = 'none';
        return;
      }

      // Hide loading spinner and show weather data
      document.getElementById('loading').style.display = 'none';
      document.getElementById('weatherInfo').style.display = 'block';

      const cityName = data.name;
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const icon = data.weather[0].icon;  // Weather icon

      document.getElementById('cityName').textContent = cityName;
      document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
      document.getElementById('description').textContent = `Condition: ${description}`;
      document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
      document.getElementById('windSpeed').textContent = `Wind Speed: ${windSpeed} m/s`;
      document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${icon}.png`;

      // Change background based on weather condition
      if (description.includes("clear")) {
        document.body.style.background = "linear-gradient(to right, #FFB85F, #FF995D)";
      } else if (description.includes("rain")) {
        document.body.style.background = "linear-gradient(to right, #00b0ff, #0099cc)";
      } else if (description.includes("cloud")) {
        document.body.style.background = "linear-gradient(to right, #a6a6a6, #e0e0e0)";
      } else if (description.includes("snow")) {
        document.body.style.background = "linear-gradient(to right, #cce0ff, #99b3ff)";
      } else {
        document.body.style.background = "linear-gradient(to right, #00c6ff, #0072ff)";
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
      document.getElementById('loading').style.display = 'none';
    });
}

// Function to update the clock
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById('current-time').textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial clock update when the page loads
updateClock();
