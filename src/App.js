import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import rain_icon from "./assets/rain.png";
import snow_icon from "./assets/snow.png";
import wind_icon from "./assets/wind.png"

import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [location, setLocation] = useState("");
  const [wIcon, setWIcon] =useState(clear_icon);
  const api_key = `72d1fbc2e3cf450b4684db6975b1681a`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`;
  const handleSearch = () => {
    if (location) {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          handleWIcon(data.weather[0].icon)
          setLocation("");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleWIcon = (icon) =>{
    if(icon === "01d" || icon === "01n"){
      setWIcon(clear_icon);
    }
    else if(icon === "02d" || icon === "02n"){
      setWIcon(cloud_icon);
    }
    else if(icon === "03d" || icon === "03n"){
      setWIcon(drizzle_icon);
    }
    else if(icon === "04d" || icon === "04n"){
      setWIcon(drizzle_icon);
    }
    else if(icon === "09d" || icon === "09n"){
      setWIcon(rain_icon);
    }
    else if(icon === "10d" || icon === "10n"){
      setWIcon(rain_icon);
    }
    else if(icon === "13d" || icon === "13n"){
      setWIcon(snow_icon);
    }
  }

   const getCurrentDate= (separator='/')=>{

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hour = newDate.getHours();
    let min = newDate.getMinutes();
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}${'  '}${hour}${': '}${min}`
    }

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch} />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
          {data.dt && <p className="date">{getCurrentDate()}</p>}
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <>
                 <img className="weather-icon" src={wIcon} alt="" />
                 <p>{data.weather[0].main}</p>
                 <p className="weather-description">{data.weather[0].description}</p>
              </>
            ) : null}
          </div>
        </div>
      </div>
      {data.name !== undefined && (
        <div className="bottom">
          <div className="feel">
            {data.main ? (
              <p className="bold">{data.main.feels_like.toFixed()}°C</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? (
              <p className="bold">{data.main.humidity.toFixed()}%</p>
            ) : null}
            <p>Humidity</p>
          </div>
          <div className="feel">
            {data.main ? (
              <p className="bold">{data.wind.speed.toFixed()} MPH</p>
            ) : null}
            <p>Wind Speed</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
