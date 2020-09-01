import React from "react"

export default class Banner extends React.Component {
  constructor(props) { super(props) }

  render() {
    return (
        <section id="banner">
          <div className="inner">
            <h1>RecRoom</h1>
            <p>Plataforma de compartilhamento de moradia universitária</p>
          </div>
          <video autoPlay loop muted playsinline src="../../../static/frontend/images/ban.mp4"></video>
        </section>
    )
  }
}
