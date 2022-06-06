import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import FormRegister from "../user/FormRegister";
import FormLogin from "../user/FormLogin";
import FormHouse from "../house/FormHouse";
// import useLocalStorage from "use-local-storage"
import InterestsContainer from "../user/InterestsContainer";
import useWindowSize from "../home/WindowSize";
import { GiHamburgerMenu } from "react-icons/gi";
import Burger from "react-css-burger";

export default function LoadingCover({ loading }) {
  return (
    loading && (
      <div className="loader-gif-backdrop">
        <div className="loader-gif">
          <img src="/media/ux-laws-loading.gif" alt="icone de carregamento" />
        </div>
      </div>
    )
  );
}
