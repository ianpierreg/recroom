import React from "react"
import '../../../static/frontend/css/common.css'
import TopMenu from "../common/TopMenu";

export default function Header({ token, setToken }) {
  return (
    <header id="header">
      <a className="logo" href="/">RecRoom</a>
      <TopMenu token={token} setToken={setToken} />
    </header>
  )
}