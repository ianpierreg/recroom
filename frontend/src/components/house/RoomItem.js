import React, { useState } from "react"
import { render } from "react-dom"
import '../../../static/frontend/css/common.css'

export default function RoomItem({ room, medal, score, openValuation }) {
  return (
    <div className="column flip-card-front">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src="/media/bedroom.jpg" alt="Imagem do quarto" />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <div className="title-medal">
              <div className="title is-4 fixed-title-height">{room.description}</div>
              { medal && (
                <div className="medal">
                  <img src={medal} alt="Medalha de ouro"/>
                </div>
              )}
            </div>
            <div className="subtitle is-6">R$ {room.price}</div>
            <div className="score-evaluate">
              <span>
                <strong>{score}%</strong> de score de afinidade (izinho)
              </span>
              <button
                type="submit"
                className="button is-primary is-medium"
                onClick={openValuation}
                disabled={!!room.valuation}
              >
                {!room.valuation ? 'Avaliar' : 'Avaliado'}
              </button>

            </div>

            <br />
          </div>
        </div>
      </div>
    </div>

  )
}