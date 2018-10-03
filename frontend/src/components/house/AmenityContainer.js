import React from "react"
import { render } from "react-dom"
import '../../../static/frontend/css/common.css'
import * as ReactDOM from "react-dom";

export default class AmenityContainer extends React.Component {
  constructor(props) {
    super(props)
    let amenity = "amenity"+this.props.order
    this.state  = {
      add_button: true,
      [amenity]: ""
    }

    this.showAddRemoveButton = this.showAddRemoveButton.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleAdd(e) {
    e.preventDefault()
    this.setState({add_button: false})
    this.props.onChangeAdd()
  }

  handleRemove(e) {
    e.preventDefault()
    this.props.onChangeRemove(this.props.order)
  }

  showAddRemoveButton() {
      if(this.state.add_button) {
        return (
          <a href="#" id="add-amenity" onClick={this.handleAdd}><span className="icon is-medium plus-minus plus"><i className="fa fa-plus"></i></span></a>
        )
      } else {
        return (
          <a href="#" id="remove-amenity" onClick={this.handleRemove}><span className="icon is-medium plus-minus minus"><i className="fa fa-minus"></i></span></a>
        )
      }
  }

  render() {
    let keys = Object.keys(this.state);
    return (
      <div className="field is-horizontal" id={this.props.order}>
        <div className="field-label is-normal">
          <label id={"label-amenity"+this.props.order} className="label">{this.props.order == 0 ? "Facilidades": ""}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control is-expanded">
              <input id={"amenity"+this.props.order} name={"amenity"+this.props.order} onChange={this.handleChange} onBlur={this.props.onBlur(this.state["amenity"+this.props.order], this.props.order)}
                                        value={this.state["amenity"+this.props.order]} className="input" type="text" placeholder="Facilidade"/>
            </p>
          </div>
          <div id="div-amenity" className="1">
            {this.showAddRemoveButton()}
          </div>
        </div>
      </div>
    )
  }
}