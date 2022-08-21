import { useState, useEffect } from 'react'
import axios from 'axios'

import Display from './Display'

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
          })
      setLocation('')
    }
  }

  const reqLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords_url = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${api_key}`
      axios.get(coords_url)
          .then((response) => {
            setData(response.data)
            console.log(response.data)
          })
    })
  }

  useEffect(() => {
    reqLocation();
  }, [])

  return (
    <div className="App">
      <img className="background"
           src={ data.main ? (data.weather[0].main === 'Clouds' ? cloudGIF : ((data.weather[0].main === 'Rain' || data.weather[0].main === 'Thunderstorm') ? rainGIF : sunsetGIF)) : null }
           alt=""
      />

      <div className="search">
        <input value={location}
               onChange={event => setLocation(event.target.value)}
               placeholder='Enter Location'
               onKeyPress={searchLocation}
               type="text"
        />
      </div>

      <Display data={data}/>
    </div>
  );
}

export default App;
