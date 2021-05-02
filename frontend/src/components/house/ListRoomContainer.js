import React, { useState, useEffect, useRef } from "react"
import { render } from "react-dom"
import RoomContainer from "./RoomContainer"
import InfiniteScroll from 'react-infinite-scroller'

export default function ListRoomContainer({ endpoint, token }) {
  const pageSize = 10
  const [data, setData] = useState()
  const [hasMore, setHasMore] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const [listCount, setListCount] = useState(10)
  const ref = useRef(null)
  const scrollTo = () => ref.current.scrollIntoView({
    behavior: "smooth",
  })

  const nextPage = (page) => {
    if (!data || !data.rooms) return
    if ((data.rooms.length <= listCount)) {
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
        return response.json();
      })
      .then(data => {
        if (!data || !data.rooms) return
        setData(data)
      })
  }, [token])

  const renderRooms = () => {
    if(!data) return

    const { load, rooms } = data
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
       return <RoomContainer room={room} key={room.id} medal={medalPath} />
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
      <div className="container">
        <InfiniteScroll
          pageStart={0}
          loadMore={nextPage}
          hasMore={hasMore}
          loader={<div className="loader" key={0}>Loading ...</div>}
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
