document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '52e735675de60ab2c267fa3d8252f7cf';
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('location');
    const weatherDetails = document.getElementById('weatherDetails');

    // Function to fetch weather data and display details
    function fetchWeatherAndDisplayDetails(location) {
        if (location === '') {
            // Clear weather details if location is empty
            weatherDetails.innerHTML = '';
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Display weather details
                const temperature = Math.round(data.main.temp - 273.15);
                const climate = data.weather[0].main;
                const windSpeed = data.wind.speed;
                const humidity = data.main.humidity;
                const pressure = data.main.pressure;

                weatherDetails.innerHTML = `
                    <p>Temperature: ${temperature}°C</p>
                    <p>Climate: ${climate}</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Pressure: ${pressure} hPa</p>
                `;

                // Change background color based on weather condition
                if (climate === 'Clouds') {
                    document.body.style.backgroundColor = 'lightgray';
                } else if (climate === 'Clear') {
                    document.body.style.backgroundColor = 'skyblue';
                } else if (climate === 'Rain') {
                    document.body.style.backgroundColor = 'lightblue';
                } else {
                    document.body.style.backgroundColor = 'white';
                }
            })
            .catch(error => {
                console.log('Error fetching weather data:', error);
                alert('Failed to fetch weather data.');
            });
    }

    // Event listener for pressing Enter key in the input field
    locationInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const location = locationInput.value.trim();
            fetchWeatherAndDisplayDetails(location);
        }
    });

    // Event listener for clicking the search button
    searchBtn.addEventListener('click', function() {
        const location = locationInput.value.trim();
        fetchWeatherAndDisplayDetails(location);
    });
});
