import React from "react"
import { render } from "react-dom"
import Slider from 'react-animated-slider'
import '../../../../../node_modules/bulma-carousel/dist/css/bulma-carousel.min.css'
import '../../../../../node_modules/bulma-carousel/dist/js/bulma-carousel.min'
export default class TopSlider extends React.Component {

  render() {
    return (
      <Slider>
        <div style={{ background: `url('http://eatingdisorderschannel.com/wp-content/uploads/2018/04/Bachelor-Bungalow-bedroom-greymodern-luxe-bachelor-bungalow-with-a-character.jpg') no-repeat center center` }}>
          <div className="center">
              <h1>RecRoom encontra quartos com alta probabilidade de afinidade entre os moradores da casa.</h1>
              <p>Com o RecRoom você encontra o melhor quarto com os melhores moradores,
                  onde você poderá ter uma maior probabilidade de afinidade</p>
              <button>Saiba mais</button>
          </div>
        </div>

        <div style={{ background: `url('https://ak4.picdn.net/shutterstock/videos/4873844/thumb/1.jpg') no-repeat center center` }}>
          <div className="center">
              <h1>RecRoom encontra quartos com alta probabilidade de afinidade entre os moradores da casa.</h1>
              <p>Com o RecRoom você encontra o melhor quarto com os melhores moradores,
                  onde você poderá ter uma maior probabilidade de afinidade</p>
          </div>
        </div>

        <div style={{ background: `url('https://images2.roomstogo.com/is/image/roomstogo/br_rm_cottagecolors_white_panel~Cottage-Colors-White-5-Pc-Full-Panel-Bedroom.jpeg?$pdp_gallery_945$') no-repeat center center` }}>
          <div className="center">
              <h1>RecRoom encontra quartos com alta probabilidade de afinidade entre os moradores da casa.</h1>
              <p>Com o RecRoom você encontra o melhor quarto com os melhores moradores,
                  onde você poderá ter uma maior probabilidade de afinidade</p>
              <button>Buscar</button>
          </div>
        </div>
      </Slider>
    )
  }
}
