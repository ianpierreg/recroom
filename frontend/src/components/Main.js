import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./home/Header";
import Banner from "./home/Banner";
import useLocalStorage from "./common/localStorageHook";
import Highlights from "./home/Highlights";
import Footer from "./home/Footer";
import ListRooms from "./ListRooms";
import ReactPaginate from 'react-paginate';
import "../../static/frontend/css/main.css";

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