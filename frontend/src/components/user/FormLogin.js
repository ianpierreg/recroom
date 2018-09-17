import React, { Component } from "react";
import PropTypes from "prop-types";
import '../../../static/frontend/css/common.css';
import CSRFToken from '../common/csrftoken';

class FormLogin extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired
  };

  state = {
   email: "",
   password:"",
   close: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getCookie(cookieName) {
      let cookieValue = document.cookie
      let cookieStart = cookieValue.indexOf(" " + cookieName + "=")
      if (cookieStart == -1) {
        cookieStart = cookieValue.indexOf(cookieName + "=")
      }
      if (cookieStart == -1) {
        cookieValue = null
      } else {
        cookieStart = cookieValue.indexOf("=", cookieStart) + 1
        let cookieEnd = cookieValue.indexOf(";", cookieStart)
        if (cookieEnd == -1) {
          cookieEnd = cookieValue.length
        }
        cookieValue = unescape(cookieValue.substring(cookieStart,cookieEnd))
      }
      return cookieValue
  }

  handleSubmit = e => {
    const csrftoken = this.getCookie('csrftoken');
    e.preventDefault();
    const {  email, password } = this.state;
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
    fetch(this.props.endpoint, conf).then(response => {
         if (response.status !== 200) {
          return null;
        }
        return response.json();
    }).then(data => {
        localStorage.setItem("user", data.user)
        localStorage.setItem("token", "Token "+data.token)
        location.reload();
    })
  };

  removeElement(id) {
    const elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
  }

  closeModal() {
      this.setState({close: true})
  }

  render() {
    const { email, password} = this.state;
    return (
        <div className={this.state.close ? "modal" : "modal is-active"}>
            <div className="modal-background"></div>
            <div className="modal-card column is-mobile is-one-quarter">
                <header className="modal-card-head">
                    <p className="modal-card-title is-size-5-mobile">Entrar</p>
                    <button className="delete" aria-label="close" onClick={this.closeModal.bind(this)}></button>
                </header>
                <section className="modal-card-body">
                    <div className="columns is-centered">
                        <div className="column is-10">
                             <form onSubmit={this.handleSubmit}>
                                  <div className="field">
                                     <div className="control">
                                      <input
                                        className="input is-medium"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={this.handleChange}
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
                                        onChange={this.handleChange}
                                        value={password}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <CSRFToken csrf={this.getCookie('csrftoken')}/>
                                  <div className="control">
                                    <button type="submit" className="button is-primary is-fullwidth is-medium">
                                      Entrar
                                    </button>
                                  </div>
                              </form>
                              <div className="soft-line-wrapper">
                                  <div className="soft-line"></div>
                              </div>
                        </div>
                    </div>
                     <div className="center-text">
                            Ainda não tem conta? <a>Cadastrar</a>
                     </div>
                </section>
            </div>
        </div>
    );
  }
}
export default FormLogin;