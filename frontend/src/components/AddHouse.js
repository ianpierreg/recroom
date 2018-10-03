import React from "react";
import ReactDOM from "react-dom";
import FormHouse from "./house/FormHouse";

const AddHouse = () => (
    <div>
        <FormHouse endpoint="/api/add-house/" />
    </div>
);
const wrapper = document.getElementById("admin");
wrapper ? ReactDOM.render(<AddHouse />, wrapper) : null;