# Weather API Configuration

## How to set up your OpenWeather API key:

1. **Get your API key:**
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Go to your API keys section
   - Copy your API key

2. **Add your API key to the weather service:**
   - Open `assets/js/weather-service.js`
   - Find the line: `this.apiKey = 'YOUR_OPENWEATHER_API_KEY';`
   - Replace `YOUR_OPENWEATHER_API_KEY` with your actual API key

3. **Example:**
   ```javascript
   this.apiKey = 'abcd1234567890efgh'; // Your actual API key here
   ```

## Features Added:

- **Weather Integration**: When booking a tour, users will see current weather conditions for the destination
- **Location Mapping**: Middle-Earth locations are mapped to real-world coordinates
- **Weather Tips**: Smart suggestions based on current weather conditions
- **Modal Dialog**: Weather information is displayed in an attractive modal dialog
- **Error Handling**: Graceful fallback if weather data is unavailable

## Files Modified:

- `assets/js/weather-service.js` - New weather service module
- `assets/css/weather.css` - Weather modal styling
- `assets/js/common.js` - Updated booking process with weather integration
- `assets/js/tours.js` - Pass region data for weather lookup
- `assets/js/home.js` - Updated tour booking with weather
- `tours.html` and `home.html` - Added weather CSS and JS includes

## Testing:

After adding your API key, try booking any tour to see the weather modal in action!