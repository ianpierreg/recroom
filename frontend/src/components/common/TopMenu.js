import React, { useState, useEffect } from "react"
import { render } from "react-dom"
import FormRegister from "../user/FormRegister";
import FormLogin from "../user/FormLogin";
import FormHouse from "../house/FormHouse"
// import useLocalStorage from "use-local-storage"
import InterestsContainer from "../user/InterestsContainer";
import useWindowSize from "../home/WindowSize";
import { GiHamburgerMenu } from 'react-icons/gi';
import Burger from 'react-css-burger';

export default function TopMenu({ token, setToken }) {
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const size = useWindowSize()

  const showRegisterModal = () => {
    setShowLogin(false)
    setShowQuestions(false)
    setShowRegister(true)
  }

  const showLoginModal = () => {
    setShowRegister(false)
    setShowQuestions(false)
    setShowLogin(true)
  }

  const showQuestionsModal = () => {
    setShowLogin(false)
    setShowRegister(false)
    setShowQuestions(true)
  }

   const closeRegisterModal = () => { setShowRegister(false) }

  const closeLoginModal = () => { setShowLogin(false) }

  const closeQuestionsModal = () => { setShowQuestions(false) }

  const renderModal = () => {
   return (
     <React.Fragment>
       <FormRegister
         endpoint="/cadastrar/"
         close={closeRegisterModal}
         show={showRegister}
         showQuestions={showQuestionsModal}
         setToken={setToken}
       />
       <FormLogin
         endpoint="/login/"
         close={closeLoginModal}
         show={showLogin}
         showQuestions={showQuestionsModal}
         setToken={setToken}
       />
       <InterestsContainer
         endpoint="/interesses/"
         close={closeQuestionsModal}
         show={showQuestions}
       />
     </React.Fragment>
   )
  }

  const logout = () => {
    const conf = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    };
    fetch("/logout/", conf).then(response => {
        if(response.status !== 200) {
          return null
        }
        setToken(null)
        // location.reload()
    })
  }

  const renderLoginOrLogoutBtn = () => {
    if(!token) {
      return (
        <div className="inherit-div">
          <span className="level-item" onClick={showRegisterModal}><a>Cadastrar</a></span>
          <span className="level-item" onClick={showLoginModal}><a className="button is-success">Entrar</a></span>
        </div>
      )
    } else {
      return (
        <React.Fragment>
          <span id="questions" className="level-item" onClick={showQuestionsModal}>
            <a>Responder perguntas</a>
          </span>
          <span className="level-item" onClick={logout}>
            <a className="button is-danger">Sair</a>
          </span>
        </React.Fragment>
      )
    }
  }

  const renderHamburger = () => {
    return (
      <div className="hamburger-menu">
       <Burger
          onClick={() => setIsOpen(!isOpen)}
          active={isOpen}
          burger="slider"
          color="white"
        />
      </div>
    )
  }

  const renderHamburgerMenu = () => {
    return (
      <div className={isOpen ? "hamburger-menu-list is-open" : "hamburger-menu-list"}>
        { renderLoginOrLogoutBtn()}
      </div>
    )
  }

  return !size ? null : (
    <section className="top">
      <div className="level-right">
        {renderHamburgerMenu()}
        {size && size.width && size.width <= 780 ? renderHamburger() : renderLoginOrLogoutBtn()}
      </div>
      {renderModal()}
    </section>
  )
}
