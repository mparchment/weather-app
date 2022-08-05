import { useState } from 'react'
import axios from 'axios'

import sunsetGIF from './assets/sunset.gif'
import rainGIF from './assets/rain.gif'
import cloudGIF from './assets/clouds.gif'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const api_key = "78a8ba5fefb418c25358149acee65c9c"

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
          .then((response) => {
            setData(response.data)
            console.log(response.data)
          })
      setLocation('')
    }
  }

  const convertTemp = (tempKelvin) => {
    return Math.round((((tempKelvin - 273.15) * 9) / 5) + 32);
  }

  return (
    <div className="App">
      <img className="background"
           src={ data.main ? (data.weather[0].main === 'Clouds' ? cloudGIF : (data.weather[0].main === 'Rain' ? rainGIF : sunsetGIF)) : null }
           alt=""
      />


      <div className="search">
        <input value={location}
               onChange={event=>setLocation(event.target.value)}
               placeholder='Enter Location'
               onKeyPress={searchLocation}
               type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h1>{data.main ? convertTemp(data.main.temp) : null}°F</h1>
          </div>
          <div className="description">
            <p>{data.weather ? data.weather[0].main : null}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels-like">
            <p>Feels Like</p>
            <p className="bold">{convertTemp(data.main ? data.main.feels_like : null)}°F</p>
          </div>
          <div className="humidity">
            <p>Humidity</p>
            <p>{data.main ? data.main.humidity : null}%</p>
          </div>
          <div className="wind">
            <p>Wind Speed</p>
            <p className="bold">{data.main ? data.wind.speed : null} MPH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
