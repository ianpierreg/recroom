import React from "react"
import { render } from "react-dom"
import FormRegister from "../user/FormRegister";
import FormLogin from "../user/FormLogin";
import FormHouse from "../house/FormHouse"
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
       return <InterestsContainer endpoint="/interesses/" close={false}/>
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
        <section className="top">
          {/*Main container*/}
            <nav className="level navbar is-light is-fixed-top padding-top">
              {/*Left side*/}
                <div className="level-left">
                    <div className="level-item">
                        <p className="subtitle is-5">
                            <strong>RecRoom</strong>
                        </p>
                    </div>
                    <div className="level-item">
                        <div className="field has-addons">
                            <p className="control">
                                <input className="input" type="text" placeholder="Procure por uma cidade"/>
                            </p>
                            <p className="control">
                                <button className="button">
                                    Buscar
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/*Right side*/}
                <div className="level-right">
                    <p className="level-item"><strong>Moradias</strong></p>
                    <p className="level-item"><a>Sobre nós</a></p>
                    <p id="questions" className="level-item" onClick={this.setModal.bind(this, 'questions')}><a>Responder perguntas</a></p>
                    {this.renderLoginOrLogoutBtn()}
                </div>
            </nav>
            {this.renderModal()}
        </section>


    )
  }
}
