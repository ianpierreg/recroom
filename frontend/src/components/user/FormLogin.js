import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import '../../../static/frontend/css/common.css';
import CSRFToken from '../common/csrftoken';

export default function FormLogin({ endpoint, clos, showQuestions,setToken, show }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailChange = e => setEmail(e.target.value)

  const handlePasswordChange = e => setPassword(e.target.value)

  const getCookie = (cookieName) => {
    let cookieValue = document.cookie
    let cookieStart = cookieValue.indexOf(" " + cookieName + "=")
    if (cookieStart === -1) {
      cookieStart = cookieValue.indexOf(cookieName + "=")
    }
    if (cookieStart === -1) {
      cookieValue = null
    } else {
      cookieStart = cookieValue.indexOf("=", cookieStart) + 1
      let cookieEnd = cookieValue.indexOf(";", cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = cookieValue.length
      }
      cookieValue = unescape(cookieValue.substring(cookieStart,cookieEnd))
    }
    return cookieValue
  }

  const handleSubmit = e => {
    const csrftoken = getCookie('csrftoken');
    e.preventDefault()
    const user = { email, password }
    const conf = {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    };
    fetch(endpoint, conf).then(response => {
      debugger
      if (response.status !== 200) {
        return null
      }
      return response.json()
    }).then(data => {
      if (data) {
        debugger
        console.log(data, 'data')
        localStorage.setItem("user", data.user)
        setToken("Token " + data.token)
        showQuestions()
      } else {
        setError('Email ou senha incorretos, verifique os dados e tente novamente.')
      }
    })
  };

  const removeElement = (id) => {
    const elem = document.getElementById(id)
    return elem.parentNode.removeChild(elem)
  }

  return (
    <div className={show ? "modal is-active" : "modal"}>
      <div className="modal-background" />
      <div className="modal-card column is-mobile is-one-third">
        <header className="modal-card-head">
          <span className="modal-card-title is-size-5-mobile">Entrar</span>
          <button className="delete" aria-label="close" onClick={close} />
        </header>
        <section className="modal-card-body">
          <div className="columns is-centered">
            <div className="column is-10">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleEmailChange}
                      value={email}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="password"
                      name="password"
                      placeholder="Senha"
                      onChange={handlePasswordChange}
                      value={password}
                      required
                    />
                  </div>
                </div>
                <CSRFToken csrf={getCookie('csrftoken')}/>
                <div className="control">
                  <button type="submit" className="button is-primary is-fullwidth is-medium">
                    Entrar
                  </button>
                </div>
              </form>
              <div className="soft-line-wrapper">
                <div className="soft-line" />
                 <div className="error">{error}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
