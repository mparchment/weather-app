function Display({ data }) {
    const convertTemp = (tempKelvin) => {
        return Math.round((((tempKelvin - 273.15) * 9) / 5) + 32);
    }

    const convertTimestamp = (timestamp) =>  {
        const date = new Date(timestamp * 1000);
        const hour = date.getHours()
        const minutes = date.getMinutes()
        if (hour > 12) {
            return ((hour % 12) + ":" + minutes + " PM");
        }
         return (hour + ":" + minutes + " AM");
    }

    return (
        <div className="display">
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
                <div className="info-wrapper">
                    <div className="feels-like info">
                        Feels Like
                        <p className="bold">{convertTemp(data.main ? data.main.feels_like : null)}°F</p>
                    </div>
                    <div className="humidity info">
                        Humidity
                        <p className="bold">{data.main ? data.main.humidity : null}%</p>
                    </div>
                    <div className="wind info">
                        Wind Speed
                        <p className="bold">{data.main ? data.wind.speed : null} MPH</p>
                    </div>
                    <div className="wind info">
                        Sunrise
                        <p className="bold">{convertTimestamp(data.main ? data.sys.sunrise : null)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Display;