class WeatherService {
    constructor() {
        // OpenWeather API key here
        this.apiKey = '73cbb4231a9d2dc6897d06da6fea05ac'; // Replace with your actual API key
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    getLocationCoords(region) {
        const locations = {
            'Shire': { lat: 53.4084, lon: -2.9916, name: 'The Shire (English Countryside)' },
            'Rivendell': { lat: 46.2044, lon: 6.1432, name: 'Rivendell (Swiss Alpine Valley)' },
            'Mordor': { lat: 37.7510, lon: 14.9934, name: 'Mordor (Mount Etna, Sicily)' },
            'Rohan': { lat: 47.4979, lon: 19.0402, name: 'Rohan (Hungarian Plains)' },
            'Gondor': { lat: 41.9028, lon: 12.4964, name: 'Gondor (Mediterranean Italy)' },
            'Erebor': { lat: 46.5197, lon: 9.8563, name: 'Erebor (Swiss Mountain Peak)' },
            'Wilderland': { lat: 61.2181, lon: 149.9003, name: 'Wilderland (Alaskan Wilderness)' },
            'Eriador': { lat: 56.4907, lon: -4.2026, name: 'Eriador (Scottish Highlands)' },
            'Isengard': { lat: 64.0685, lon: -21.9426, name: 'Isengard (Icelandic Geysers)' },
            'Fangorn': { lat: 48.1351, lon: 11.5820, name: 'Fangorn Forest (Bavarian Forest)' },
            'Moria': { lat: 46.9480, lon: 7.4474, name: 'Moria (Alpine Cave System)' },
            'Misty Mountains': { lat: 46.0207, lon: 7.7491, name: 'Misty Mountains (Swiss Alps)' },
            'Lothlórien': { lat: 46.8182, lon: 8.2275, name: 'Lothlórien (Swiss Forest Valley)' },
            'Dead Marshes': { lat: 52.2593, lon: 0.1215, name: 'Dead Marshes (English Fens)' },
            'Pelennor Fields': { lat: 41.9028, lon: 12.4964, name: 'Pelennor Fields (Roman Countryside)' },
            'Eyrie': { lat: 46.5586, lon: 7.7386, name: 'Eagles Eyrie (High Alpine Peak)' },
            'Emyn Muil': { lat: 52.7767, lon: -1.5581, name: 'Emyn Muil (English Rocky Hills)' }
        };

        // Extract the main region from composite regions (e.g., "Shire, Rivendell, Mordor" -> finds "Shire")
        // This loops through each location and checks if the tour region contains that location name
        for (const [key, value] of Object.entries(locations)) {
            if (region.includes(key)) {
                return value;
            }
        }

        // Default to Shire if region not found
        return locations['Shire'];
    }

    async getWeatherForRegion(region) {
        try {
            const location = this.getLocationCoords(region);
            const url = `${this.baseUrl}?lat=${location.lat}&lon=${location.lon}&appid=${this.apiKey}&units=metric`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Weather API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            return {
                location: location.name,
                temperature: Math.round(data.main.temp),
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                humidity: data.main.humidity,
                windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
                feelsLike: Math.round(data.main.feels_like)
            };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return {
                location: region,
                temperature: '--',
                description: 'Weather data unavailable',
                icon: '01d',
                humidity: '--',
                windSpeed: '--',
                feelsLike: '--'
            };
        }
    }

    getWeatherIcon(iconCode) {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }

    formatWeatherInfo(weatherData) {
        return `
            <div class="weather-info">
                <div class="weather-header">
                    <img src="${this.getWeatherIcon(weatherData.icon)}" alt="${weatherData.description}" class="weather-icon">
                    <div class="weather-main">
                        <h4>Current Weather in ${weatherData.location}</h4>
                        <div class="temperature">${weatherData.temperature}°C</div>
                        <div class="description">${weatherData.description}</div>
                    </div>
                </div>
                <div class="weather-details">
                    <div class="weather-detail">
                        <span>Feels like:</span>
                        <span>${weatherData.feelsLike}°C</span>
                    </div>
                    <div class="weather-detail">
                        <span>Humidity:</span>
                        <span>${weatherData.humidity}%</span>
                    </div>
                    <div class="weather-detail">
                        <span>Wind:</span>
                        <span>${weatherData.windSpeed} km/h</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Create global instance
window.weatherService = new WeatherService();