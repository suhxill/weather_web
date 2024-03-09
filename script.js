const box = document.querySelector('.box');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');

search.addEventListener('click', async () => {
    const APIKey = '4a8ca7413124030ae371c1e289e13526';
    const cityInput = document.querySelector('.search-box input');
    const city = cityInput.value.trim();

    if (city === '') {
        return; 
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        if (!response.ok) {
            throw new Error('City not found or API error');
        }

        const json = await response.json();
        const image = document.querySelector('.weather-box img');
        const description = document.querySelector('.weather-box .description');
        const temperature = document.querySelector('.weather-box .temperature');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'sun.png';
                break;
            case 'Rain':
                image.src = 'rainy-day.png';
                break;
            case 'Snow':
                image.src = 'snow.png';
                break;
            case 'Mist':
                image.src = 'mist.png';
                break;
            case 'Clouds':
                image.src = 'cloudy-day.png';
                break;
            case 'Smoke':
                image.src = 'smoke.png';
                break;
            case 'Haze':
                image.src = 'haze.png';
                break;
            default:
                image.src = 'clouds.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<sup>°C</sup>`;
        description.innerHTML = json.weather[0].description;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
});
