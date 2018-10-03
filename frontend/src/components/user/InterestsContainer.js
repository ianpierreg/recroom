import React, { Component } from "react";
import PropTypes from "prop-types";
import '../../../static/frontend/css/common.css';
import NumberFormat from 'react-number-format'
import InterestOptionContainer from "./InterestOptionContainer";

class InterestsContainer extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired
  };

  state = {
   items: [],
   interests: [],
   type: null
  };

  componentWillMount() {
    this.callWebservice()
  }

  renderOptions = () => {
    if(this.state.interests.length > 0) {
      let optionsComponents = this.state.interests.map((interest) =>
         <InterestOptionContainer interest={interest} handleChange={this.handleChange} key={interest.id}/>
      )

      const size = 2; let arrayOfArrays = [];
      for (let i=0; i<optionsComponents.length; i+=size) {
         arrayOfArrays.push(optionsComponents.slice(i,i+size));
      }

      let arrayOfColumns = []
      for(let j = 0; j < arrayOfArrays.length; j++) {
          arrayOfColumns.push(
              <div className="columns tenant-landlord interests-columns">
                  {
                      arrayOfArrays[j].map((option) =>
                        option
                     )
                  }
              </div>
          )
      }

      return arrayOfColumns.map((column) =>
        column
      )
    } else {
      return <div className="no-new-questions">
        Nenhuma pergunta disponível no momento!
      </div>
    }

  }

  static removeItem(arr) {
    let what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
  }

  handleChange = e => {
    let items = [...this.state.items];
    let checkbutton =  document.getElementById(e.target.id)
    let parent = checkbutton.parentElement;
    if(!checkbutton.checked){
        InterestsContainer.removeItem(items, e.target.value)
        parent.classList.remove("background-checked")
    } else  {
        items.push(e.target.value)
        parent.classList.add("background-checked")
    }
    this.setState({ items: items })
  };

  handleSubmit = e => {
    e.preventDefault()
    this.callWebservice()
  };

  callWebservice() {
    const conf = {
      method: "post",
      body: JSON.stringify(this.state.items),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    }
    let _this = this
    fetch(this.props.endpoint, conf).then(response => {
      if (response.ok) {
        if (response.status !== 200) {
          return null;
        }
      }

      return response.json();
    }).then(data => {
      console.log(data.interests, data.type)
      this.setState({interests: data.interests, type: data.type})
    })
  }

  closeModal() {
      this.setState({close: true})
  }

  render() {
    return (
        <div className={this.state.close ? "modal" : "modal is-active"}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title is-size-5-mobile">{this.state.type}</p>
                    <button className="delete" aria-label="close" onClick={this.closeModal.bind(this)}></button>
                </header>
                <section className="modal-card-body">
                    <div className="columns is-centered">
                        <div className="column is-10">
                            <form onSubmit={this.handleSubmit}>
                              {this.renderOptions()}
                              <div className="control">
                                <button type="submit" className="button is-primary is-fullwidth is-medium">
                                  Cadastrar-se
                                </button>
                              </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
  }
}
export default InterestsContainer;