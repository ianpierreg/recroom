import React, { Component } from "react";
import PropTypes from "prop-types";
import '../../../static/frontend/css/common.css';
import CSRFToken from '../common/csrftoken';

class FormRegister extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    showQuestions: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
  };

  state = {
    email: "",
    first_name: "",
    last_name: "",
    password:"",
    password2:"",
    birthdate:"",
    errors: {},
    error: "",
    group: "tenant" //this can be either 'tenant' or 'landlord'
  };

  componentDidMount(smoething) {
     this.checkRadioBackground();
  }

  checkRadioBackground = () => {

    if (document.getElementById('tenant').checked) {
      document.getElementById('landlord-wrapper').classList.remove("background-checked");
      document.getElementById("tenant-wrapper").classList.add("background-checked");
    } else if(document.getElementById('landlord').checked) {
      document.getElementById('tenant-wrapper').classList.remove("background-checked");
      document.getElementById('landlord-wrapper').classList.add("background-checked");
    }
  };

  renderError = field => {
    if(this.state.errors && this.state.errors[field]) {
      return <p className="help is-danger">{this.state.errors[field]}</p>;
    }
    return null;
  }

  //returns a js object as following: {error: boolean, msg:'the error message'}
  validateEmail() {
    let email = this.state.email;
    if(email.length == 0) {
      return {valid: false, msg: "O E-mail não pode ser em branco"}
    }

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(email).toLowerCase())) {
      return {valid: false, msg:"O E-mail é inválido"}
    }
    return {valid:true, msg:""}
  }

  // handleOnBlurPassword = e => {
  //   let errors = Object.assign({}, this.state.errors);
  //   this.setState({ [e.target.name]: e.target.value }, function() {
  //
  //   });
  // };

  validatePassword1() {
    if(this.state.password.length === 0) {
      return {valid: false, msg: 'Senha não pode ser em branco'}
    }

    if(this.state.password.length < 6) {
      return {valid: false, msg: 'Senha não pode ter menos que 6 caracteres'}
    }

    return {valid: true, msg: ""}
  }

  validatePassword2() {
    if(this.state.password2.length === 0) {
      return {valid: false, msg: 'Repetição de senha não pode ser em branco'}
    }

    if(this.state.password2.length < 6) {
      return {valid: false, msg: 'Repetição de senha não pode ter menos que 6 caracteres'}
    }

    return {valid: true, msg: ""}
  }

  validateEqualPasswords() {
    if(this.state.password !== this.state.password2) {
      return {valid: false, msg: 'As senhas não coincidem'}
    }
    return {valid: true, msg: ""}

  }

  handleChange = e => {
    let value = e.target.value
    this.setState({ [e.target.name]: e.target.value })
  };


  handleChangeRadio = e => {
    this.setState({ [e.target.name]: e.target.value })
    this.checkRadioBackground();
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

  validateForm() {
    let has_error = false;
    let errors = {};
    //the functions this.validateSomething() will return an js object as following: {error: boolean, msg:'the error message'}
    let email_validated = this.validateEmail()
    let password1_validated = this.validatePassword1()
    let password2_validated = this.validatePassword2()
    let passwords_validated = this.validateEqualPasswords()

    if(this.state.first_name.length == 0) {
      errors.first_name = "O primeiro nome não pode ser em branco"
    }

    if(this.state.last_name.length == 0) {
      errors.last_name = "O último nome não pode ser em branco"
    }


    if(!email_validated.valid) {
      errors.email = email_validated.msg
      has_error = true;
    }

    if(!password1_validated.valid) {
      errors.password =  password1_validated.msg
      has_error = true;
    }

    if(!password2_validated.valid) {
      errors.password2 =  password2_validated.msg
      has_error = true;
    }

    if(!passwords_validated.valid) {
      errors.password2 =  passwords_validated.msg
      has_error = true;
    }
    this.setState({errors: errors})

    return has_error;

  };

  closeModal() { this.props.close() }

  cleanNumberVal(value) {
    return value.replace(/[()-. ]/g, '');
  }

  deserializeErrorsUsers(data) {
    let profile = data.profile;
    delete data.profile;
    let user_profile = Object.assign(data, profile);
    let deserialized = {}
    for(let property in user_profile) {
      deserialized[property]  = user_profile[property][0]
    }
    this.setState({errors: deserialized})
  }

  handleSubmit = e => {
    const csrftoken = this.getCookie('csrftoken')
    console.log(csrftoken)
    e.preventDefault()
    if(this.validateForm()) return

    const {  email, first_name, last_name, password, birthdate, group } = this.state

    const profile = { birthdate, group }
    const user = { email, first_name, last_name, password }

    if (Object.values({ ...profile, ...user }).some(val => val === '')) {
         this.setState({ error: 'Preencha todos os campos do formulário para se registrar.' })
      return
    } else {
      this.setState({ error: '' })
    }
    const conf = {
      method: "post",
      body: JSON.stringify({ ...user, profile }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
        'Authorization': localStorage.getItem("token")
      }
    };
    fetch(this.props.endpoint, conf).then(response => {
      const _this = this;
      if (response.ok) {
        if (response.status !== 201) {
          return null;
        }
      } else {
        return response.json()
          .then(function(err) {
            _this.deserializeErrorsUsers(err)
          });
      }

      return response.json();
    }).then(data => {
      this.props.setToken("Token "+data.token)
      this.props.showQuestions()
      // document.getElementById('questions').click();
    })
  };


  render() {
    const { email, first_name, last_name, password, password2, birthdate } = this.state;
    return (
      <div className={this.props.show ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <span className="modal-card-title is-size-5-mobile">Cadastre-se gratuitamente</span>
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
                        placeholder="Endereço de email"
                        onChange={this.handleChange}
                        value={email}

                      />
                    </div>
                    {this.renderError("email")}
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control has-icons-right">
                        <input
                          className="input is-medium"
                          type="text"
                          name="first_name"
                          placeholder="Primeiro nome"
                          onChange={this.handleChange}
                          value={first_name}

                        />
                      </div>
                      {this.renderError("first_name")}
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          name="last_name"
                          placeholder="Último nome"
                          onChange={this.handleChange}
                          value={last_name}

                        />
                      </div>
                      {this.renderError("last_name")}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="date"
                        name="birthdate"
                        placeholder="Data de aniversário"
                        onChange={this.handleChange}
                        value={birthdate}

                      />
                    </div>
                    {this.renderError("birthdate")}
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="password"
                          name="password"
                          placeholder="Criar uma senha"
                          onChange={this.handleChange}
                          value={password}
                        />
                      </div>
                      {this.renderError("password")}
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="password"
                          name="password2"
                          placeholder="Repita sua senha"
                          onChange={this.handleChange}
                          value={password2}

                        />
                      </div>
                      {this.renderError("password2")}
                    </div>
                  </div>
                  <div className="tenant-landlord field-body">
                    <div id="tenant-wrapper" className="field">
                      <input id="tenant" className="is-checkradio"
                             type="radio" name="group" value="tenant" defaultChecked="defaultChecked"
                             onChange={this.handleChangeRadio}/>
                      <label className="label-radio" htmlFor="tenant">Locador</label>
                    </div>
                    <div id="landlord-wrapper" className="field" >
                      <input id="landlord" className="is-checkradio" type="radio"
                             name="group" value="landlord" onChange={this.handleChangeRadio} disabled/>
                      <label className="label-radio" htmlFor="landlord">Proprietário</label>
                    </div>


                  </div>
                  <CSRFToken csrf={this.getCookie('csrftoken')}/>
                  <div className="control">
                    <button type="submit" className="button is-primary is-fullwidth is-medium">
                      Cadastrar-se
                    </button>
                  </div>
                </form>
                <div className="soft-line-wrapper">
                  <div className="soft-line" />
                  <div className="error">{this.state.error}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default FormRegister;