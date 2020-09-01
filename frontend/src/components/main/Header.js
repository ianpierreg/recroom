import React from "react"
import FormRegister from "../user/FormRegister";
import FormLogin from "../user/FormLogin";
import InterestsContainer from "../user/InterestsContainer";

export default class Header extends React.Component {
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
     if(this.state.modal === "cadastrar") {
         return <FormRegister endpoint="/cadastrar/" />
     } else if (this.state.modal === "login") {
        return <FormLogin endpoint="/login/" />
     } else if (this.state.modal === "questions") {
       return <InterestsContainer endpoint="/interesses/" close={false}/>
    }
  }

    setModal(type) {
    this.setState({
      modal: null
    }, () => {
        this.setState({
        modal: type
      })
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
              <React.Fragment>
                <button className="register" onClick={this.setModal.bind(this, 'cadastrar')}>Cadastrar-se</button>
                <button className="enter" onClick={this.setModal.bind(this, 'login')}>Entrar</button>
               </React.Fragment>
          )
      } else {
          return (
              <React.Fragment>
                <a id="questions" className="level-item" onClick={this.setModal.bind(this, 'questions')}>Responder perguntas</a>
                <button className="logout" onClick={this.logout}>Sair</button>
              </React.Fragment>


          )
      }
  }

  render() {
    return (
        <header id="header">
          <a className="logo" href="/">RecRoom</a>
          <div className="site-header-buttons">
            {this.renderLoginOrLogoutBtn()}
          </div>
          {this.renderModal()}
        </header>
    )
  }
}