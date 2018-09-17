import React, { Component } from "react";


class CSRFToken extends Component {

    render(){
        return (
            <input type="hidden" name="csrfmiddlewaretoken" value={this.props.csrf} />
        )
    }
};
export default CSRFToken;