import React from "react"
import { render } from "react-dom"
import RoomContainer from "./RoomContainer";
import TopMenu from "../common/TopMenu";


export default class ListRoomContainer extends React.Component {
  constructor(props) {
    super(props)
    this.renderRooms = this.renderRooms.bind(this)
  }

  renderAnswerQuestionsLayout(subtitle, body, button) {
    return (
      <div className="oopsWrapper">
        <div className="oopsTitle">Oops</div>
        <div className="oopsSubtitle">{subtitle}</div>
        <div className="oopsBody">{body}</div>
        {button && <div className="oopsButton"><button>Responder Perguntas</button></div>}
      </div>
    )
  }


  renderRooms() {
    if (this.props.placeholder === "Something wen wrong" || !this.props.data) {
      const subtitle = 'Nenhuma moradia encontrada para o seu perfil'
      const body = 'Por favor, clique no botão "Responder perguntas" no menu superior'

      return this.renderAnswerQuestionsLayout(subtitle, body, true)
    }
    const roomsData = Object.entries(this.props.data)
    if(roomsData === undefined || roomsData.rooms === undefined || roomsData.rooms.length === 0) {
      return this.renderAnswerQuestionsLayout("Nenhuma moradia encontrada", "Por favor, volte mais tarde", false)
    }

    const rooms = []
    Object.keys(this.props.data.rooms).forEach(key => {
      this.props.data.rooms[key].forEach(item => {
        item.value = key
        rooms.push(item)
      })
    })

    let roomComponents = rooms.map((room) =>
      <RoomContainer room={room} key={room.id} />
    )

    const size = 4; let arrayOfArrays = [];
    for (let i=0; i<roomComponents.length; i+=size) {
      arrayOfArrays.push(roomComponents.slice(i,i+size));
    }

    let arrayOfColumns = []
    for(let j = 0; j < arrayOfArrays.length; j++) {
      arrayOfColumns.push(
        <div className="cards-wrapper">
          {
            arrayOfArrays[j].map((room) => room)
          }
        </div>
      )
    }

    return arrayOfColumns.map((column) => column)
  }



  render() {
    return (
        <div>
            <section className="section">
              {this.renderRooms()}
            </section>
        </div>
    )
  }
}
