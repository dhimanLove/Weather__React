import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import sunCloudy from "../../assets/sun-cloudy.png";
import Rain from "../../assets/rain.png";
import PartlySunny from "../../assets/partly-sunny.png";
import SunWindy from "../../assets/sun-windy.png";
import Compass from "../../assets/compass.png";
import Drops from "../../assets/drops.png";
import Ultraviolet from "../../assets/ultraviolet.png";

const Dashboard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


  useEffect(() => {
    if (city && API_KEY) {
      setLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [city, API_KEY]);

  const isValid = weather && weather.cod === 200;

  if (loading) {
    return (
      <section className="dashboard-section">
        <h2>Loading weather data...</h2>
      </section>
    );
  }

  return (
    <section className="dashboard-section">
      <div className="home">
        <div className="feed-1">
          <div className="feeds">
            <img src={sunCloudy} alt="Weather Icon" />
            <div>
              <div>
                <span>{isValid ? `${weather.name}, ${weather.sys.country}` : "City"}</span>
                <span>{isValid ? Math.round(weather.main.temp) : "--"}<sup>o</sup></span>
              </div>
              <div>
                <span>{isValid ? weather.weather[0].main : "Condition"}</span>
                <span>0</span>
              </div>
            </div>
          </div>

          <div className="feed">
            <div>
              <div>
                <img src={PartlySunny} alt="Partly Sunny" />
                <span>14 <sup>o</sup></span>
              </div>
              <div>
                <span>Saturday</span>
                <span>Sun</span>
              </div>
            </div>
            <div>
              <div>
                <img src={SunWindy} alt="Windy" />
                <span>16 <sup>o</sup></span>
              </div>
              <div>
                <span>Saturday</span>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </div>

        <div className="highlights">
          <h2>Today's Highlights</h2>
          <div className="all-highlights">
            <div>
              <div>
                <img src={Compass} alt="Compass" />
                <div>
                  <span>Feels Like</span>
                  <span>Normal</span>
                </div>
              </div>
              <div>
                <span>{isValid ? Math.round(weather.main.feels_like) : "--"}<sup>o</sup></span>
              </div>
            </div>

            <div>
              <div>
                <img src={sunCloudy} alt="Clouds" />
                <div>
                  <span>Cloud</span>
                  <span>{isValid ? weather.weather[0].description : "--"}</span>
                </div>
              </div>
              <div>
                <span>{isValid ? weather.clouds.all : "--"}%</span>
              </div>
            </div>

            <div>
              <div>
                <img src={Rain} alt="Rain" />
                <div>
                  <span>Rain</span>
                  <span>Normal</span>
                </div>
              </div>
              <div>
                <span>{isValid && weather.rain?.["1h"] ? `${weather.rain["1h"]} mm` : "0 mm"}</span>
              </div>
            </div>

            <div>
              <div>
                <img src={Drops} alt="Humidity" />
                <div>
                  <span>Humidity</span>
                  <span>{isValid ? (weather.main.humidity > 60 ? "Heavy" : "Normal") : "--"}</span>
                </div>
              </div>
              <div>
                <span>{isValid ? weather.main.humidity : "--"}%</span>
              </div>
            </div>

            <div>
              <div>
                <img src={Ultraviolet} alt="UV" />
                <div>
                  <span>UV</span>
                  <span>Unavailable</span>
                </div>
              </div>
              <div>
                <span>7</span>
              </div>
            </div>

            <div>
              <div>
                <img src={PartlySunny} alt="Wind" />
                <div>
                  <span>Wind</span>
                  <span>Normal</span>
                </div>
              </div>
              <div>
                <span>{isValid ? `${weather.wind.speed} km/h` : "--"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Cities */}
      <div className="cities">
        <h2>Other Cities</h2>
        <div className="all-cities">
          {[
            { name: "Manchester", temp: 11, cond: "Cloudy" },
            { name: "Edinburgh", temp: 19, cond: "Rain" },
            { name: "Bristol", temp: 22, cond: "Snow" },
            { name: "York", temp: 20, cond: "Cloudy" },
          ].map((city, i) => (
            <div key={i}>
              <div>
                <img src={city.cond === "Rain" ? Rain : sunCloudy} alt={`${city.cond} Icon`} />
                <div>
                  <span>{city.name}</span>
                  <span>
                    {city.cond}. High: {city.temp + 2}° Low: {city.temp - 2}°
                  </span>
                </div>
              </div>
              <div>
                <span>
                  {city.temp} <sup>o</sup>
                </span>
              </div>
            </div>
          ))}

          <button>
            <span>See More</span>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;