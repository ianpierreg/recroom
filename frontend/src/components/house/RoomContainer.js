import React from "react"
import { render } from "react-dom"
import '../../../static/frontend/css/common.css'

export default function RoomContainer({ room, medal }) {
  return (
    <div className="column">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src="/media/bedroom.jpg" alt="Imagem do quarto" />
          </figure>
        </div>
        <div className="card-content">

          <div className="content">
            <div className="title-medal">
              <div className="title is-5 fixed-title-height">{room.description}</div>
              { medal && (
                <div className="medal">
                  <img src={medal} alt="Medalha de ouro"/>
                </div>
              )}
            </div>
            <div className="subtitle is-6">R$ {room.price}</div>
            <strong>{(room.value*100).toFixed(2)} %</strong> de probabilidade de afinidade (izinho)
            <br />
            <a href="#">#rock</a> <a href="#">#pedalar</a> <a href="#">#neymajr</a> <a
            href="#">#ufc</a>
          </div>
        </div>
      </div>
    </div>
  )
}