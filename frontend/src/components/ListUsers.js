import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./common/DataProvider";
import Table from "./common/Table";

const ListUsers = () => (
    <DataProvider endpoint="/api/user/"
                render={data => <Table data={data} />} />
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<ListUsers />, wrapper) : null;