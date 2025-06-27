import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import VideoBackground from "./components/VideoBackground/VideoBackground";
import Home from "./components/home/home"; // New Home component

const App = () => {
  const [city, setCity] = useState("London");
  const navigate = useNavigate();

  const handleSearch = (newCity) => {
    if (newCity.trim() !== "") {
      setCity(newCity);
      navigate(`/dashboard/${newCity}`); // Navigate to dashboard with city
    }
  };

  return (
    <>
      <VideoBackground />
      <NavBar />
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:city" element={<Dashboard />} />
      </Routes>

    </>
  );
};

export default App;