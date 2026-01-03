const API_BASE_URL = 'http://localhost:5000/api';

const elements = {
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    weatherInfo: document.getElementById('weatherInfo'),
    forecast: document.getElementById('forecast'),
    cityName: document.getElementById('cityName'),
    weatherIcon: document.getElementById('weatherIcon'),
    temperature: document.getElementById('temperature'),
    description: document.getElementById('description'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    forecastGrid: document.getElementById('forecastGrid')
};

async function getWeatherData(city) {
    try {
        showLoading();
        hideError();
        
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/weather/${city}`),
            fetch(`${API_BASE_URL}/forecast/${city}`)
        ]);

        if (!weatherResponse.ok) {
            throw new Error('City not found');
        }

        const weatherData = await weatherResponse.json();
        const forecastData = forecastResponse.ok ? await forecastResponse.json() : [];

        displayWeatherData(weatherData);
        displayForecastData(forecastData);
        
    } catch (error) {
        showError(error.message === 'City not found' ? 'City not found. Please try again.' : 'Failed to fetch weather data. Please try again.');
    } finally {
        hideLoading();
    }
}

function displayWeatherData(data) {
    elements.cityName.textContent = `${data.city}, ${data.country}`;
    elements.temperature.textContent = Math.round(data.temperature);
    elements.description.textContent = data.description;
    elements.humidity.textContent = data.humidity;
    elements.windSpeed.textContent = data.windSpeed;
    elements.weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
    elements.weatherIcon.alt = data.description;
    
    elements.weatherInfo.classList.remove('hidden');
}

function displayForecastData(data) {
    elements.forecastGrid.innerHTML = '';
    
    data.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        
        forecastItem.innerHTML = `
            <div class="forecast-date">${day.date}</div>
            <div class="forecast-temp">${Math.round(day.temperature)}°C</div>
            <div class="forecast-desc">${day.description}</div>
            <img class="forecast-icon" src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.description}">
        `;
        
        elements.forecastGrid.appendChild(forecastItem);
    });
    
    if (data.length > 0) {
        elements.forecast.classList.remove('hidden');
    }
}

function showLoading() {
    elements.loading.classList.remove('hidden');
    elements.weatherInfo.classList.add('hidden');
    elements.forecast.classList.add('hidden');
}

function hideLoading() {
    elements.loading.classList.add('hidden');
}

function showError(message) {
    elements.error.textContent = message;
    elements.error.classList.remove('hidden');
    elements.weatherInfo.classList.add('hidden');
    elements.forecast.classList.add('hidden');
}

function hideError() {
    elements.error.classList.add('hidden');
}

function handleSearch() {
    const city = elements.cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    getWeatherData(city);
}

elements.searchBtn.addEventListener('click', handleSearch);
elements.cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

window.addEventListener('load', () => {
    elements.cityInput.focus();
});
