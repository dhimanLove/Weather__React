import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import sunCloudy from "../../assets/sun-cloudy.png";
import Rain from "../../assets/rain.png";
import PartlySunny from "../../assets/partly-sunny.png";
import SunWindy from "../../assets/sun-windy.png";
import Compass from "../../assets/compass.png";
import Drops from "../../assets/drops.png";
import Ultraviolet from "../../assets/ultraviolet.png";

const Dashboard = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [otherCitiesWeather, setOtherCitiesWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    let mounted = true;
    if (city && API_KEY) {
      setLoading(true);
      setError(null);
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch weather data");
          return res.json();
        })
        .then((data) => {
          if (mounted) {
            if (data.cod === 200) setWeather(data);
            else throw new Error(data.message || "City not found");
            setLoading(false);
          }
        })
        .catch((err) => {
          if (mounted) {
            setError(err.message);
            setLoading(false);
          }
        });
    } else if (mounted) {
      setLoading(false);
    }
    return () => (mounted = false);
  }, [city, API_KEY]);

  useEffect(() => {
    const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai"];
    Promise.all(
      cities.map((cityName) =>
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
          .then((res) => res.json())
          .then((data) => ({
            name: cityName,
            temp: data.main.temp,
            cond: data.weather[0].main,
          }))
          .catch(() => null)
      )
    ).then((results) => {
      setOtherCitiesWeather(results.filter(Boolean));
    });
  }, [API_KEY]);

  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const isValid = weather && weather.cod === 200;

  if (loading) {
    return (
      <section className="dashboard-section">
        <h2 style={{ color: "#fff", textAlign: "center" }}>Loading weather data...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-section">
        <h2 style={{ color: "#fff", textAlign: "center" }}>Error: {error}</h2>
        <p style={{ color: "#fff", textAlign: "center" }}>Please try another city or check your connection.</p>
      </section>
    );
  }

  return (
    <section className="dashboard-section">
      <div className="home">
        <div className="feed-1">
          <div className="feeds">
            <img src={sunCloudy} alt="Weather Icon" />
            <div className="feeds-content">
              <div className="feeds-left">
                <span className="location">{isValid ? `${weather.name}, ${weather.sys.country}` : "City"}</span>
                <span className="date">
                  {isValid
                    ? new Date(weather.dt * 1000).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })
                    : "Date"}
                </span>
              </div>

              <div className="feeds-right">
                <span className="temp">{isValid ? Math.round(weather.main.temp) : "--"}<sup>°</sup></span>
                <span className="condition">{isValid ? weather.weather[0].main : "Condition"}</span>
              </div>
            </div>
          </div>

          <div className="feed feed-vertical">
            <div>
              <div>
                <img src={PartlySunny} alt="Sunrise" />
              </div>
              <div>
                <span><strong>Sunrise:</strong> {isValid ? formatTime(weather.sys.sunrise) : "--"}</span>
                <span>{isValid ? weather.weather[0].main : "Clouds"}</span>
              </div>
            </div>
            <div>
              <div>
                <img src={SunWindy} alt="Sunset" />
              </div>
              <div>
                <span><strong>Sunset:</strong> {isValid ? formatTime(weather.sys.sunset) : "--"}</span>
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
              <div><span>{isValid ? Math.round(weather.main.feels_like) : "--"}<sup>o</sup></span></div>
            </div>
            <div>
              <div>
                <img src={sunCloudy} alt="Clouds" />
                <div>
                  <span>Cloud</span>
                  <span>{isValid ? weather.weather[0].description : "--"}</span>
                </div>
              </div>
              <div><span>{isValid ? weather.clouds.all : "--"}%</span></div>
            </div>
            <div>
              <div>
                <img src={Rain} alt="Rain" />
                <div><span>Rain</span><span>Normal</span></div>
              </div>
              <div><span>{isValid && weather.rain?.["1h"] ? `${weather.rain["1h"]} mm` : "0 mm"}</span></div>
            </div>
            <div>
              <div>
                <img src={Drops} alt="Humidity" />
                <div>
                  <span>Humidity</span>
                  <span>{isValid ? (weather.main.humidity > 60 ? "Heavy" : "Normal") : "--"}</span>
                </div>
              </div>
              <div><span>{isValid ? weather.main.humidity : "--"}%</span></div>
            </div>
            <div>
              <div>
                <img src={Ultraviolet} alt="UV" />
                <div><span>UV</span><span>Unavailable</span></div>
              </div>
              <div><span>7</span></div>
            </div>
            <div>
              <div>
                <img src={PartlySunny} alt="Wind" />
                <div><span>Wind</span><span>Normal</span></div>
              </div>
              <div><span>{isValid ? `${weather.wind.speed} km/h` : "--"}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="cities">
        <h2>Other Cities</h2>
        <div className="all-cities">
          {otherCitiesWeather.map((cityItem, i) => (
            <div
              key={i}
              className="city-card"
              onClick={() => navigate(`/dashboard/${cityItem.name}`)}
              style={{ cursor: "pointer" }}
            >
              <div>
                <img src={cityItem.cond === "Rain" ? Rain : sunCloudy} alt={`${cityItem.cond} Icon`} />
                <div>
                  <span>{cityItem.name}</span>
                  <span>
                    {cityItem.cond}. High: {Math.round(cityItem.temp + 2)}° Low: {Math.round(cityItem.temp - 2)}°
                  </span>
                </div>
              </div>
              <div>
                <span>{Math.round(cityItem.temp)}<sup>o</sup></span>
              </div>
            </div>
          ))}
          <button onClick={() => navigate("/cities")}>
            <span>See More</span>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
