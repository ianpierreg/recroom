import React, { useState, useEffect, useRef } from "react"
import { render } from "react-dom"
import RoomContainer from "./RoomContainer"
import InfiniteScroll from 'react-infinite-scroller'

export default function ListRoomContainer({ endpoint, token }) {
  const pageSize = 10
  const [data, setData] = useState()
  const [dataBound, setDataBound] = useState()
  const [hasMore, setHasMore] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const [listCount, setListCount] = useState(10)
  const ref = useRef(null)
  const scrollTo = () => ref.current.scrollIntoView({
    behavior: "smooth",
  })

  const getRoomValuations = () => {
        const conf = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }

    fetch('/valuations/', conf)
      .then(response => {
        if (response.status !== 200) return null
        return response.json()
      })
      .then(res => {
        console.log('valuations', res)
        if (!res || !res.valuations) return
        const roomsBound = data.rooms.map(room => {
          room.valuation = res.valuations.find(valuation => valuation.room === room.id)
          return room
        })
        setDataBound({ ...data, rooms: roomsBound })
      })
  }

  useEffect(() => {
    if(!data || !data.rooms) return
    getRoomValuations()
  }, [data])

  const nextPage = (page) => {
    if (!dataBound || !dataBound.rooms) return
    if ((dataBound.rooms.length <= listCount)) {
      setHasMore(false)
      return
    }
    if(page*pageSize === listCount) return
    console.log('next page', page)
    if (!showButton) setShowButton(true)
		setListCount((count) => count + pageSize)
  }

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
        return response.json()
      })
      .then(res => {
        if (!res || !res.rooms) return
        console.log('rooms', res)
        setData(res)
      })
  }, [token])

  const renderRooms = () => {
    if(!dataBound) return

    const { load, rooms } = dataBound
    if(load === 0) return null
    if(rooms && rooms.length > 0) {

      console.log('listCount', listCount)
      const roomComponents = rooms.slice(0, listCount).map((room, index) => {
        let medalPath
        switch(index) {
          case 0:
            medalPath = '/media/goldmedal.png'
            break
          case 1:
            medalPath = '/media/silvermedal.png'
            break
          case 2:
            medalPath = '/media/bronzemedal.png'
            break
          default:
            medalPath = undefined
        }
       return <RoomContainer position={index+1} room={room} key={room.id} medal={medalPath} />
      })

      return roomComponents
    } else {
      return (
        <div>
          Nenhum quarto cadastrado.
        </div>
      )
    }
  }

  return (
    <section className="section" ref={ref}>
      <h2 className="list-title">Ranking de quartos</h2>
      <div className="container">
        <InfiniteScroll
          pageStart={0}
          loadMore={nextPage}
          hasMore={hasMore}
          loader={(
            <div className="loader-gif" key={0}>
              <img src="/media/ux-laws-loading.gif" alt="icone de carregamento" />
            </div>
          )}
        >
          {renderRooms()}
        </InfiniteScroll>
      </div>
       {showButton && (
          <div className="go-top-wrapper">
            <button className="go-top" onClick={scrollTo}>Topo do Ranking</button>
          </div>
        )}
    </section>
  )
}
