import React from "react";
import ReactDOM from "react-dom";
import InterestsContainer from "./user/InterestsContainer";

const Register = () => (
    <div>
        <InterestsContainer endpoint="/interests/" />
    </div>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Register />, wrapper) : null;