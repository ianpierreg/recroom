import React, { useState } from "react"
import ReactStars from 'react-rating-stars-component'
import CSRFToken from '../common/csrftoken'
import Swal from 'sweetalert2'
import '../../../static/frontend/css/common.css'

export default function RoomValuation({ room, score, opened, closeValuation, position }) {
  const [stars, setStars] = useState()
  const [comment, setComment] = useState()
  const [error, setError] = useState('')
  
    const getCookie = (cookieName) => {
      let cookieValue = document.cookie
      let cookieStart = cookieValue.indexOf(" " + cookieName + "=")
      if (cookieStart === -1) {
        cookieStart = cookieValue.indexOf(cookieName + "=")
      }
      if (cookieStart === -1) {
        cookieValue = null
      } else {
        cookieStart = cookieValue.indexOf("=", cookieStart) + 1
        let cookieEnd = cookieValue.indexOf(";", cookieStart)
        if (cookieEnd === -1) {
          cookieEnd = cookieValue.length
        }
        cookieValue = unescape(cookieValue.substring(cookieStart,cookieEnd))
      }
      return cookieValue
    }


    const handleSubmit = e => {
    const csrftoken = getCookie('csrftoken');
    e.preventDefault()

    if (!stars) {
      setError('Por favor, avalie o quarto através das "estrelas" no intervalo entre 1 e 5.')
      return
    } else setError('')

    const valuation = { stars, comment, score: room.value, ranking_position: position, room_id: room.id }

    console.log('valuation', valuation)
    const conf = {
      method: "post",
      body: JSON.stringify(valuation),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
        'Authorization': localStorage.getItem('token')
      }
    };
    fetch('/evaluate/', conf).then(response => {
      if (response.status !== 200) return null
      return response.json()
    }).then(data => {
      if (data) {
        Swal.fire(
          'Avaliação bem sucedida',
          'Obrigado por avaliar esse quarto :)',
          'success'
        )
        closeValuation(valuation)
      } else {
        Swal.fire(
        'Erro ao avaliar',
        'Tente novamente',
        'error'
      )
      }
    })
  };

  return (
     <div className={opened ? "modal is-active" : "modal"}>
      <div className="modal-background" />
      <div className="modal-card column is-mobile is-four-fifths">
        <header className="modal-card-head">
          <span className="modal-card-title is-size-5-mobile">Avaliar recomendação</span>
          <button className="delete" aria-label="close" onClick={closeValuation} />
        </header>
        <section className="modal-card-body valuation">
          <div className="first-column">
            <div className="score">
            <div className="score-number">{score}%</div>
            <div className="score-description">de score de afinidade (izinho)</div>
          </div>
            <form onSubmit={handleSubmit}>
              <div className="stars control">
                <label>Avalie a recomendação (izinho):</label>
                <ReactStars
                  count={5}
                  onChange={(value) => setStars(value)}
                  size={35}
                  // activeColor="#ffd700"
                />,
              </div>
              <div className="comments control">
                <label htmlFor="comments">Conte-nos o que achou da recomendação (opcional):</label>
                <textarea 
                  name="comments" 
                  id="comments" 
                  rows="7" 
                  onChange={e => setComment(e.target.value)}
                />
              </div>
               <div className="control evaluate">
                  <CSRFToken csrf={getCookie('csrftoken')} />
                  <button type="submit" className="button is-primary is-fullwidth is-medium">
                    Avaliar
                  </button>
                </div>
                <div className="error">{error}</div>
            </form>
          </div>
          <div className="second-column">
            <div className="house-info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut varius odio ac nisi elementum suscipit. Duis tristique iaculis condimentum. Fusce non purus nibh. Nullam placerat pulvinar leo, non interdum ante gravida eu. Vestibulum sed est euismod, sodales velit ultricies, hendrerit ligula. Pellentesque pharetra fermentum nisl sed pharetra. Phasellus mattis ut diam eget suscipit. Donec non ante vel tortor aliquet auctor. Curabitur semper efficitur leo sit amet consectetur. Donec volutpat mi quis tempus placerat. Fusce ornare fermentum dui, eget malesuada neque condimentum tincidunt. Ut ac porta mi. Etiam eget lorem neque.

Duis dictum imperdiet vehicula. Donec vulputate velit ac diam placerat venenatis. Sed iaculis nec neque sed tincidunt. Integer sed ante eget lectus tincidunt blandit consequat porttitor enim. Praesent bibendum, arcu non pellentesque gravida, lorem magna molestie magna, quis sollicitudin tortor metus at leo. Phasellus quis condimentum velit. Phasellus auctor quis tortor at pulvinar. In accumsan ex et dolor finibus volutpat. Suspendisse ut ante diam. Integer tempus, ex vel varius hendrerit, lorem lectus dapibus odio, quis aliquet sem lectus porttitor nisl. Donec vel cursus urna. Mauris auctor dapibus sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac sem nunc.

Suspendisse eleifend odio ullamcorper mi gravida, accumsan euismod diam luctus. Nulla feugiat cursus elit, ac pharetra justo ornare sit amet. Praesent vel lectus vel odio placerat ornare. Duis non iaculis sem. Duis ultrices molestie mauris eget consectetur. Praesent nulla lectus, feugiat eu arcu sed, venenatis iaculis orci. Suspendisse ligula diam, varius ac lorem quis, scelerisque convallis tortor. Fusce ac iaculis odio, a malesuada neque. Cras posuere dignissim dolor, eu gravida nisi eleifend in. Ut id rhoncus sapien, quis ultricies enim. Aenean efficitur odio sed sem mattis, eu lacinia diam vestibulum. Curabitur efficitur semper dui. Duis facilisis dolor sed tortor condimentum auctor vel eu nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean laoreet, orci eget elementum fermentum, elit leo sodales orci, tristique efficitur justo sem molestie purus. Donec accumsan viverra nibh at tristique.

Aenean eu turpis sed leo tristique pretium. Aliquam tempor auctor nibh non pulvinar. Aliquam ut finibus orci, sed rutrum mi. Morbi ac tortor dolor. Curabitur auctor, magna vitae dignissim luctus, tellus massa venenatis leo, gravida faucibus diam eros a justo. Praesent id mi dignissim neque porttitor bibendum. Sed a vestibulum purus. Donec semper diam ligula, ac vehicula velit tincidunt imperdiet. Morbi ac ante nec tellus commodo condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent faucibus lorem eu augue ullamcorper, eu cursus orci suscipit. Quisque rutrum ante non elit ornare volutpat.

Aliquam accumsan mi ac mi mollis vulputate. Cras mollis turpis dolor, non venenatis arcu ullamcorper at. Fusce ultricies ultrices ante vitae blandit. Nullam euismod metus ut libero ornare commodo. Quisque quis est elit. Nulla a elementum est. Quisque lobortis nunc consectetur dui sodales porttitor. Phasellus hendrerit purus turpis, a accumsan eros sodales ut. Nam hendrerit arcu molestie, accumsan velit sit amet, consectetur orci. Morbi lacinia semper turpis, id fringilla ligula iaculis at. Maecenas in justo sit amet ante luctus pretium tempus et ipsum. Donec quis accumsan augue. Nunc ornare dapibus elit, quis maximus justo gravida at.
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}