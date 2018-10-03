import React from "react"
import { render } from "react-dom"
import '../../../static/frontend/css/common.css'
import * as ReactDOM from "react-dom";

export default class FurnitureContainer extends React.Component {
  constructor(props) {
    super(props)
    let furniture = "furniture"+this.props.order
    this.state  = {
      add_button: true,
      [furniture]: ""
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
          <a href="#" id="add-furniture" onClick={this.handleAdd}><span className="icon is-medium plus-minus plus"><i className="fa fa-plus"></i></span></a>
        )
      } else {
        return (
          <a href="#" id="remove-furniture" onClick={this.handleRemove}><span className="icon is-medium plus-minus minus"><i className="fa fa-minus"></i></span></a>
        )
      }
  }

  render() {
    let keys = Object.keys(this.state);
    return (
      <div className="field is-horizontal" id={this.props.order}>
        <div className="field-label is-normal">
          <label id={"label-furniture"+this.props.order} className="label">{this.props.order == 0 ? "Móveis": ""}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control is-expanded">
              <input id={"furniture"+this.props.order} name={"furniture"+this.props.order} onChange={this.handleChange} onBlur={this.props.onBlur(this.state["furniture"+this.props.order], this.props.order)}
                                        value={this.state["furniture"+this.props.order]} className="input" type="text" placeholder="Móvel"/>
            </p>
          </div>
          <div id="div-furniture" className="1">
            {this.showAddRemoveButton()}
          </div>
        </div>
      </div>
    )
  }
}