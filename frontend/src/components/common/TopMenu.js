import React, { useState, useEffect } from "react"
import { render } from "react-dom"
import FormRegister from "../user/FormRegister";
import FormLogin from "../user/FormLogin";
import FormHouse from "../house/FormHouse"
// import useLocalStorage from "use-local-storage"
import InterestsContainer from "../user/InterestsContainer";



export default function TopMenu({ token, setToken }) {
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)


  useEffect(() => {
    console.log('token', token)
  }, [token])

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

  return (
    <section className="top">
      <div className="level-right">
          {/*<span className="level-item"><strong>Moradias</strong></span>*/}
          {renderLoginOrLogoutBtn()}
      </div>
      {renderModal()}
    </section>
  )
}
