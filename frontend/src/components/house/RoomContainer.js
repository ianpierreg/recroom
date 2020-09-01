import React from "react"
import { render } from "react-dom"
import '../../../static/frontend/css/common.css'

export default class RoomContainer extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
      <div className="new-card">
        <div className="room-pic">
           <img src={this.props.room.picture_1 || "https://www.iptc.net.br/wp-content/uploads/2019/05/woocommerce-placeholder-600x600.png"}
                           alt="Imagem do quarto"/>
        </div>
        <div className="new-card-content">
          <div className="main-info">
             <div className="room-name">{this.props.room.description}</div>
          <div className="price">R$ {this.props.room.price}</div>
          </div>
          <div className="rec-info">
              <div className="points"><strong>{(this.props.room.value*100).toFixed(2)}%</strong> de probabilidade de afinidade (popup explicando afinidade)</div>
          </div>
        </div>
      </div>
    )
  }
}