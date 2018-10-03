import React from "react";
import ReactDOM from "react-dom";
import FormLogin from "./user/FormLogin";

const Login = () => (
    <div>
        <FormLogin endpoint="/login/" />
    </div>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Login />, wrapper) : null;