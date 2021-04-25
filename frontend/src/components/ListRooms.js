import React from "react";
import ListRoomContainer from "./house/ListRoomContainer";

export default function ListRooms({ token }) {
	return (
		<div>
			<ListRoomContainer
				endpoint="/api/rooms/"
				token={token}
			/>
		</div>
	)
}