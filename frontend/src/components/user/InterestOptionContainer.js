import React, { Component } from "react";
import PropTypes from "prop-types";
import '../../../static/frontend/css/common.css';
import NumberFormat from 'react-number-format'

class InterestOptionContainer extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    interest: PropTypes.object.isRequired
  };


  componentWillMount() {
  }


  render() {
    return (
      <div className="column is-half remove-padding-margin">
        <div id="tenant-wrapper" className="field">
          <input id={this.props.interest.name} className="is-checkradio" defaultChecked={false}
                 type="checkbox" name="group" value={this.props.interest.id}
                 onChange={this.props.handleChange}/>
          <label className="label-radio" htmlFor={this.props.interest.name}>{this.props.interest.name}</label>
        </div>
      </div>
    );
  }
}
export default InterestOptionContainer;