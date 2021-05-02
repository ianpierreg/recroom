import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import '../../static/frontend/css/main.css'
import Header from "./home/Header";
import Banner from "./home/Banner";
import Highlights from "./home/Highlights";
import Footer from "./home/Footer";
import ListRooms from "./ListRooms";
import ReactPaginate from 'react-paginate';

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}


const Main = () => {
  const [token, setToken] = useLocalStorage('token', null)

  return (
    <div>
      <Header token={token} setToken={setToken} />
      <Banner />
      {token ? (<ListRooms token={token} />) : (< Highlights />)}
      <Footer />
    </div>
  )

}
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Main />, wrapper) : null;