import React, { useState } from "react"
import RoomItem from './RoomItem'
import RoomValuation from './RoomValuation'
import '../../../static/frontend/css/common.css'

export default function RoomContainer({ room, medal, position }) {
  const [valuationOpened, setValuationOpened] = useState(false)
  const score = (room.value*100).toFixed(2).replace('.', ',')
  const [compoundRoom, setCompoundRoom] = useState(room)
  return (
    <React.Fragment>
      <RoomItem
        room={compoundRoom}
        medal={medal}
        score={score}
        openValuation={() => setValuationOpened(true)}
      />
      <RoomValuation
        room={room}
        score={score}
        position={position}
        opened={valuationOpened}
        closeValuation={(valuation) => {
          if (valuation) setCompoundRoom({ ...room, valuation})
          setValuationOpened(false)
        }}
      />
    </React.Fragment>
  )
}