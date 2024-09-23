import React, { useEffect, useState, useContext, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'

// Utils
import trackClick from "./utils/trackClick";
import request from "./utils/request";
import preloadImages, { getQueuedLocation } from "./shared_components/preloadImages";
import trackStat from "./utils/trackStat";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Context
import { toastsContext } from './context/ToastsProvider';
import { themeContext } from './context/ThemeProvider';

// Components
import Sidebar from './shared_components/Sidebar/Sidebar';
import Toasts from './components/Toasts/Toasts';

// Pages
import Home from"./pages/Home/home" 
import PasswordReset from "./pages/PasswordReset/passwordReset"
import Login from "./pages/Login/login"
import Signup from "./pages/Signup/signup"
import Settings from "./pages/Settings/settings"

// Styles
import "./App.scss";

export default function App() {
  // State
  const [currentImageFavoriteStatus, setCurrentImageFavoriteStatus] = useState(false);
  const [locationId, setLocationId] = useState(null);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [cityId, setCityId] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fact, setFact] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [smallImageUrl, setSmallImageUrl] = useState("");
  const [countryInfo, setCountryInfo] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [attribution, setAttribution] = useState({
      name: "",
      links: {
      html: "",
      },
  });

  // Refs
  const imageLoadedRef = useRef(imageLoaded);

  // Context
  const [toasts,] = useContext(toastsContext);
  const [, setTheme] = useContext(themeContext);

  // Hooks
  const { login } = useAuth();

  // UseEffects
  useEffect(() => {
    console.log('App loaded');
    trackClick('app-load')
  }, [])

  // Set theme if localStorage has theme set
  useEffect(() => {
    const theme = localStorage.getItem("color-theme");
    if (theme && theme === 'dark') {
      setTheme(theme)
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Check if user is logged in and JWT not expired
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const decodedJwt = parseJwt(accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        // Remove accessToken from localStorage
        localStorage.removeItem("accessToken");
          
        // remove refresh token
        localStorage.removeItem("refreshToken");
          
        // refresh page
        window.location.reload();
      }
    }
  }, [])
  
  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // This one is for the image loading on the home page
  useEffect(() => {
    async function main() {
        // Preload images from API
        await preloadImages();
        const location = getQueuedLocation();

        // Get favorite status if logged in
        // if (localStorage.getItem('token')) {
        //     request(`/favorites/city/${location.city}`)
        //         .then(response => {
        //             if(response?.data?.favorited) {
        //                 setCurrentImageFavoriteStatus(true)
        //             } else {
        //                 setCurrentImageFavoriteStatus(false)
        //             }
        //         })
        // }

        setLocationId(location.id);
        setFact(location.fact);
        setCountry(location.countryName);
        setCity(location.cityName);
        setCityId(location.city);
        setSmallImageUrl(location.smallUrl);
        setImageUrl(location.url);
        setAttribution(location.attribution);
        setCountryInfo(location.country);
        setCityInfo(location.cityInfo);
    }
    main();
}, []);

  // Functions
  const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
  };

  const checkAuth = () => {
    if (localStorage.getItem('accessToken')) {
        request(`/users`)
          .then(response => {
            if (!response?.data) {
              // Remove tokens
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');

              return;
            }

            login({
              ...response.data,
              ...{
                  isLoggedIn: true,
                  role: response?.data?.role
              }
            })
          })
    }
  }

  const refresh = async () => {
    const location = getQueuedLocation();

    // Get favorite status if logged in
    request(`/favorites/city/${location?.city}`)
        .then(response => {
            if(response?.data?.favorited) {
                setCurrentImageFavoriteStatus(true)
            } else {
                setCurrentImageFavoriteStatus(false)
            }
        })

    setImageLoaded(false);
    imageLoadedRef.current = false;
    setLocationId(location.id);
    setFact(location.fact);
    setCountry(location.countryName);
    setCity(location.cityName);
    setCityId(location.city);
    setImageUrl(location.url);
    setSmallImageUrl(location.smallUrl);
    setAttribution(location.attribution);
    setCountryInfo(location.country);
    setCityInfo(location.cityInfo);

    // Track stats
    trackClick('refresh-image')
    trackStat({ type: 'clicks', property: 'refresh' })
};

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 backgroundContainer">
      <Toasts toasts={toasts} />
      <Sidebar refresh={refresh} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Home setImageLoaded={setImageLoaded} imageLoaded={imageLoaded} imageLoadedRef={imageLoadedRef} country={country} city={city} cityId={cityId} imageUrl={imageUrl} smallImageUrl={smallImageUrl} attribution={attribution} fact={fact} countryInfo={countryInfo} cityInfo={cityInfo} locationId={locationId} currentImageFavoriteStatus={currentImageFavoriteStatus} setCurrentImageFavoriteStatus={setCurrentImageFavoriteStatus} setCountry={setCountry} setCity={setCity} setCityId={setCityId} setImageUrl={setImageUrl} setSmallImageUrl={setSmallImageUrl} setAttribution={setAttribution} setFact={setFact} setCountryInfo={setCountryInfo} setCityInfo={setCityInfo} setLocationId={setLocationId} />} />
      </Routes>
    </div>
  )
}