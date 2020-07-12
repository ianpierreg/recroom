import React from "react";
import ReactDOM from "react-dom";
import InterestsContainer from "./user/InterestsContainer";

const Interests = () => (
    <div>
        <InterestsContainer endpoint="/interesses/" />
    </div>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Interests />, wrapper) : null;