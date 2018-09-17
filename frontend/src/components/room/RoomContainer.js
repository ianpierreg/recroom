import React from "react"
import { render } from "react-dom"
import '../../../static/frontend/css/common.css'

export default class RoomContainer extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
        <div className="column is-one-quarter">
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={this.props.room.picture_1}
                             alt="Imagem do quarto"/>
                    </figure>
                </div>
                <div className="card-content fixed-column-height">

                    <div className="content">
                        <div className="title is-5 fixed-title-height">{this.props.room.description}</div>
                        <div className="subtitle is-6">R$ {this.props.room.price}</div>

                        <strong>4.5</strong> é a pontuação de afinidade
                        <br />
                            <a href="#">#rock</a> <a href="#">#pedalar</a> <a href="#">#neymajr</a> <a
                            href="#">#ufc</a>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}