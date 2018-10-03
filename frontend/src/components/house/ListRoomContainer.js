import React from "react"
import { render } from "react-dom"
import RoomContainer from "./RoomContainer";
import TopMenu from "../common/TopMenu";


export default class ListRoomContainer extends React.Component {
  constructor(props) {
    super(props)
    this.renderRooms = this.renderRooms.bind(this)
  }

  renderRooms() {
      if(this.props.data !== undefined && this.props.data.length > 0) {
          let roomComponents =  this.props.data.map((room) =>
             <RoomContainer room={room} key={room.id} />
          )

          const size = 4; let arrayOfArrays = [];
          for (let i=0; i<roomComponents.length; i+=size) {
             arrayOfArrays.push(roomComponents.slice(i,i+size));
          }

          let arrayOfColumns = []
          for(let j = 0; j < arrayOfArrays.length; j++) {
              arrayOfColumns.push(
                  <div className="columns">
                      {
                          arrayOfArrays[j].map((room) =>
                            room
                         )
                      }
                  </div>
              )
          }

          return arrayOfColumns.map((column) =>
            column
          )
      } else {
          return (
           <div>
            Nenhum quarto cadastrado.
          </div>
          )

      }


  }



  render() {
    return (
        <div>
            <TopMenu/>
            <section className="section">
                <div className="container">
                    {this.renderRooms()}
                </div>
            </section>
        </div>
    )
  }
}
