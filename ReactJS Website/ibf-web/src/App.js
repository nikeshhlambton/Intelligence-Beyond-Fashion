// Import required CSS file and components
import "./App.css";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/home";
import Contact from "./Pages/Contact/contact";
import About from "./Pages/AboutUs/about";

// Import required routing components and hooks from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import additional page components
import Trends from "./Pages/Trends/trends";
import MatchTrends from "./Pages/MatchTrends/matchTrends";

// Import constants for route paths
import { ROUTE_PATHS } from "./utility/constants";

// Import the Favourites component
import Favourites from "./Components/Favourites/Favourites";

// Import the useLocation hook from react-router-dom
import { useLocation } from 'react-router-dom';

// Import the useState hook from React
import { useState } from "react";

function App() {
  // Get the current location and path from the useLocation hook
  const location = useLocation();
  const pathName = location.pathname;

  // Define a state variable for storing favourites data
  const [favouritesData, setFavouritesData] = useState([]);

  return (
    // Render the Header and Footer components along with the Routes
    <>
      <Header />
      <div className={`${pathName === ROUTE_PATHS.HOME ? '' : 'custom_container'}`}>
      <Routes>
        // Define the routes for each page component
        <Route path={ROUTE_PATHS.HOME} element={<Home />} />
        <Route exact path={ROUTE_PATHS.CONTACT} element={<Contact />} />
        <Route exact path={ROUTE_PATHS.ABOUT_US} element={<About />} />
        <Route exact path={ROUTE_PATHS.CURRENT_MATCH} element={<Trends setFavouritesData={setFavouritesData}/>} />
        <Route exact path={ROUTE_PATHS.TREND_MATCH} element={<MatchTrends />} />
        <Route exact path={ROUTE_PATHS.FAVOURITES} element={<Favourites favouritesData={favouritesData}/>} />
      </Routes>
      </div>
      <Footer />
    </>
  );
}

// Export the App component as the default export
export default App;
