import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./common/DataProvider";
import Table from "./common/Table";
import ListRoomContainer from "./room/ListRoomContainer";

const ListRooms = () => (
    <DataProvider endpoint="/api/rooms/"
                render={data => <ListRoomContainer data={data} />} />
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<ListRooms />, wrapper) : null;