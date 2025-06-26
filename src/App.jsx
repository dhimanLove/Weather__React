import React, { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import VideoBackground from "./components/VideoBackground/VideoBackground";

const App = () => {
  const [city, setCity] = useState("London");

  const handleSearch = (newCity) => {
    if (newCity.trim() !== "") {
      setCity(newCity);
    }
  };

  return (
    <>
      <VideoBackground />
      <NavBar />
      <Header onSearch={handleSearch} />
      <Dashboard city={city} />
    </>
  );
};

export default App;