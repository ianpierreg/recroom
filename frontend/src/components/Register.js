import React from "react";
import ReactDOM from "react-dom";
import FormRegister from "./user/FormRegister";
import TopSlider from "./common/TopSlider";

const Register = () => (
    <div>
        <FormRegister endpoint="/cadastrar/" />
    </div>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Register />, wrapper) : null;