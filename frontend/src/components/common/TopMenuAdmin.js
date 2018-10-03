import React from "react"
import { render } from "react-dom"
import FormRegister from "../user/FormRegister";
import FormLogin from "../user/FormLogin";
import InterestsContainer from "../user/InterestsContainer";

export default class TopMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        logged: localStorage.getItem("token") != null, //true if the user is logged
        modal: "" //That can be 'cadastrar' or 'login'
    }
    this.renderLoginOrLogoutBtn = this.renderLoginOrLogoutBtn.bind(this)
    this.logout = this.logout.bind(this)
    this.renderModal = this.renderModal.bind(this)
  }

  renderModal() {
     if(this.state.modal == "cadastrar") {
         return <FormRegister endpoint="/cadastrar/" />
     } else if (this.state.modal == "login") {
        return <FormLogin endpoint="/login/" />
     } else if (this.state.modal == "questions") {
       return <InterestsContainer endpoint="/interesses/" />
    }
  }

  setModal(type) {
     this.setState({
          modal: type
      })
  }

  logout() {
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
          return null;
        }
        localStorage.removeItem("token")
        location.reload();
    })
  }

  renderLoginOrLogoutBtn() {
      if(!this.state.logged) {
          return (
              <div className="inherit-div">
                <p className="level-item" onClick={this.setModal.bind(this, 'cadastrar')}><a>Cadastrar</a></p>
                <p className="level-item" onClick={this.setModal.bind(this, 'login')}><a className="button is-success">Entrar</a></p>
              </div>
          )
      } else {
          return (<p className="level-item" onClick={this.logout}><a className="button is-danger">Sair</a></p>)
      }
  }

  render() {
    return (
      <div className="hero-head">
        <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">

            <a className="navbar-item is--brand">
              <img className="navbar-brand-logo" src="/bulma-admin-dashboard-template/logo.png"
                   alt="Bulma Admin Template logo"/>
            </a>
            <a className="navbar-item is-tab is-hidden-mobile is-active"><span className="icon is-medium">
              <i className="fa fa-home"></i></span>Home
            </a>
            <a className="navbar-item is-tab is-hidden-mobile">Quartos</a>
            <a className="navbar-item is-tab is-hidden-mobile">Sobre</a>

            <button className="button navbar-burger" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </button>

          </div>


          <div className="navbar-menu navbar-end" id="navMenu">
            <a className="navbar-item is-tab is-hidden-tablet is-active">Home</a>
            <a className="navbar-item is-tab is-hidden-tablet">Quartos</a>
            <a className="navbar-item is-tab is-hidden-tablet">About</a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                <figure className="image is-32x32" style="margin-right:.5em;">
                  <img src="https://avatars1.githubusercontent.com/u/7221389?v=4&s=32"/>
                </figure>
                mazipan
              </a>

              <div className="navbar-dropdown is-right">
                <a className="navbar-item">
                  <span className="icon is-small">
                    <i className="fa fa-user-o"></i>
                  </span>
                  Profile
                </a>
                <hr className="navbar-divider"/>
                  <a className="navbar-item">
                  <span className="icon is-small">
                    <i className="fa fa-power-off"></i>
                  </span>
                    Logout
                  </a>
              </div>
            </div>
          </div>
        </nav>
        {this.renderModal()}
      </div>
    )
  }
}
