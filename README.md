# Weather App

A complete weather application with frontend and backend components that displays current weather and 5-day forecast for any city.

## Features

- Current weather display (temperature, description, humidity, wind speed)
- 5-day weather forecast
- Search by city name
- Responsive design
- Error handling
- Loading states

## Tech Stack

### Backend
- Node.js
- Express.js
- Axios (for API calls)
- CORS
- OpenWeatherMap API

### Frontend
- HTML5
- CSS3 (with modern features)
- Vanilla JavaScript
- Responsive design

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)

3. Create a `.env` file in the backend directory:
   ```
   WEATHER_API_KEY=your_api_key_here
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run server
   ```

5. Start the frontend (in a new terminal):
   ```bash
   npm run client
   ```

Or run both simultaneously:
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a city name in the search box
3. Click "Search" or press Enter
4. View the current weather and 5-day forecast

## API Endpoints

- `GET /api/weather/:city` - Get current weather for a city
- `GET /api/forecast/:city` - Get 5-day forecast for a city

## Project Structure

```
weather-app/
├── backend/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── package.json
└── README.md
```

## License

MIT
