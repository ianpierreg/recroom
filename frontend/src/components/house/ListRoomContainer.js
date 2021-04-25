import React, { useState, useEffect } from "react"
import { render } from "react-dom"
import RoomContainer from "./RoomContainer";
import TopMenu from "../common/TopMenu";


export default function ListRoomContainer({ endpoint, token }) {
  const [data, setData] = useState()

  useEffect(() => {
    const conf = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }

    fetch(endpoint, conf)
      .then(response => {
        if (response.status !== 200) setData()
        return response.json();
      })
      .then(data => setData(data))
  }, [token])

  const renderRooms = () => {
    if(!data) return

    const { load, rooms } = data
    if(load === 0) return null
    if(rooms && rooms.length > 0) {
      let roomComponents =  rooms.map((room) =>
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
            {arrayOfArrays[j].map((room) => room)}
          </div>
        )
      }

      return arrayOfColumns.map((column) => column)
    } else {
      return (
        <div>
          Nenhum quarto cadastrado.
        </div>
      )

    }


  }

  return (
    <section className="section">
      <div className="container">
        {renderRooms()}
      </div>
    </section>
  )
}
