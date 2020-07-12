import React from "react";
import ReactDOM from "react-dom";
import FormHouse from "./house/FormHouse";

const AddHouse = () => (
    <div>
        <FormHouse endpoint="/api/add-house/" />
    </div>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<AddHouse />, wrapper) : null;