import React from "react"
import '../../../static/frontend/css/common.css'
// import bannerVideo from "../../../../media/banner.mp4"

export default function Banner() {

  return (
    <section id="banner">
      <div className="inner">
        <h1>RecRoom</h1>
        <p>Plataforma de compartilhamento de moradia universitária</p>
      </div>
      <video autoPlay loop muted playsInline src="/media/banner.mp4" />
    </section>
  )
}