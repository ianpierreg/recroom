import React, { useState, useEffect, useRef } from "react"
import ReactStars from 'react-rating-stars-component'
import CSRFToken from '../common/csrftoken'
import Swal from 'sweetalert2'
import { Tooltip } from '@trendmicro/react-tooltip'
import '@trendmicro/react-tooltip/dist/react-tooltip.css'
import '../../../static/frontend/css/common.css'
import useWindowSize from "../home/WindowSize";

export default function RoomValuation({ room, score, opened, closeValuation, position }) {
  const [stars, setStars] = useState()
  const [comment, setComment] = useState()
  const [error, setError] = useState('')
  const [tenantsChoices, setTenantChoices] = useState()
  const size = useWindowSize()
  const scoreDesc = 'O score de afinidade é calculado baseado nas respostas' +
  ' e interesses do seu perfil e dos perfis dos moradores da residência a qual esse quarto pertence.'
  const valuationDesc = 'Por favor, nos ajude avaliando a recomendação'
  const [showValuationForm, setShowValuationForm] = useState(false)
  const [headerHeight, setHeaderHeight] = useState('100vh')
  const ref = useRef()
  const ref2 = useRef()

  useEffect(() => {
    setHeaderHeight(`calc(100vh - ${ref.current.offsetHeight}px)`)
  }, [ref, opened])

  useEffect(() => {
    ref2.current.scrollTop = 0
  }, [ref2, opened, showValuationForm])

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

  useEffect(() => {
    let d = {}
  if(room.description === 'quan') console.log('tenant_interests', room.tenants_interests)
    room.tenants_interests.forEach((t) => {
      Object.keys(t).forEach(e => {
        if (d[e]) {

          d[e].importanceTotal += t[e].importance
        } else {

          d[e] = {importanceTotal: t[e].importance, interestTotal: {}}
        }


        t[e].interests.forEach(f => {
          if (d[e]['interestTotal'][f]) {
            debugger
            d[e]['interestTotal'][f] += 1
          } else {
            debugger
            d[e]['interestTotal'][f] = 1
          }
        })
      })
    })


    Object.values(d).forEach(ff => {
      ff.interestTotal = Object.entries(ff.interestTotal)
    })

    d = {
  "Estilo Musical": {
      "importanceTotal": 5,
      "interestTotal": [
          [
              "Pagode", 2
          ],
         [
              "Rock", 2
          ],
         [
              "Axé", 2
          ]
      ]
  },
  "Filmes e Séries": {
      "importanceTotal": 4,
      "interestTotal": [
          [
              "Comédia",
              2
          ],
          [
              "Ação",
              1
          ]
      ]
  },
  "Passeios": {
      "importanceTotal": 4,
      "interestTotal": [
          [
              "Praia",
              2
          ],
      ]
  }
}
    if(room.description === 'quan') console.log('thats the d', d)
    setTenantChoices(d)
    debugger
    let i = 0
    let da = { }
    while(Object.keys(d).length < 3 && i < Object.keys(d).length) {
        let e = Object.keys(d)[i]
        if(d[e].importanceTotal === 5) da[e] = d[e]
        i++
      }
    i = 0
    while(Object.keys(d).length < 3 && i < Object.keys(d).length) {
        let e = Object.keys(d)[i]
        if(d[e].importanceTotal === 4) da[e] = d[e]
        i++
      }
    i = 0
    while(Object.keys(d).length < 3 && i < Object.keys(d).length) {
      let e = Object.keys(d)[i]
      if(d[e].importanceTotal === 3) da[e] = d[e]
      i++
    }
  if(room.description === 'quan') console.log('da', da)
    let v = Object.keys(da).map(a => ({typeOfInterest: a, ...da[a]}))

  v =  [
  {
      "importanceTotal": 2,
      "typeOfInterest": "cinema",
        "interestTotal": {
          "forro": 2,
          "funk": 3,
          'outro': 1
        }
  },
  {
      "importanceTotal": 3,
      "typeOfInterest": "passeio",
        "interestTotal": {
          "forro": 1,
          "funk": 5,
          'outro': 4
        }
  },
  {
      "typeOfInterest": "type",
      "importanceTotal": 1,
      "interestTotal": {
          "fgfgf": 2,
          "dfgfdg": 1,
          "asa": 4,
          "azul": 2,
          "china": 3
      }
  },
  {
      "importanceTotal": 5,
      "typeOfInterest": "vida",
      "interestTotal": {
          "tipo": 2
      }
  },
  {
      "typeOfInterest": "tipo",
      "importanceTotal": 2,
      "interestTotal": {
          "tipo": 2
      }
  },
  {
      "importanceTotal": 4,
      "typeOfInterest": "musica",
      "interestTotal": {
          "forro": 4,
          "funk": 2
      }
  }
]
    v.sort((a, b) => a.importanceTotal - b.importanceTotal)

  v.forEach(c => {
    console.log('c', c)
    c.interestTotal = Object.entries(c.interestTotal)
  .sort(([,a],[,b]) => a-b)
  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
  })

    console.log('viva', v)
  }, [])

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
}

  const firstCategory = () => {
    if (!tenantsChoices || !Object.keys(tenantsChoices)[0]) return null
    const chosen = Object.keys(tenantsChoices)[0]
    const { interestTotal } = tenantsChoices[chosen]
    const length = interestTotal.length
    if (length === 0) return null

    return (
      <p>
        Nessa residência, a categoria de interesse com maior nível de importância, segundo os moradores atuais é, <b>{chosen}</b>,
        e dentro dessa categoria, {length === 1 ? 'o interesse mais escolhido foi' : 'os interesses mais escolhidos foram'}
        {interestTotal.map((interest, index) => {
          if (index === 0) return (<b>  {interest[0]}</b>)
          if (length - 1 === index) return (<b>{' e ' + interest[0]}</b>)
          return (<b>{', ' + interest[0]}</b>)
        })}
      </p>
    )
  }

  const secondCategory = () => {
    if (!tenantsChoices || !Object.keys(tenantsChoices)[1]) return null
    const chosen = Object.keys(tenantsChoices)[1]
    const { interestTotal } = tenantsChoices[chosen]
    const length = interestTotal.length
    if (length === 0) return null

    return (
      <p>
        Nessa residência, a categoria de interesse com segundo maior nível de importância para os moradores atuais é <b>{chosen}</b>,
        e dentro dessa categoria, {length === 1 ? 'o interesse mais escolhido foi' : 'os interesses mais escolhidos foram'}
        {interestTotal.map((interest, index) => {
          if (index === 0) return (<b>  {interest[0]}</b>)
          if (length - 1 === index) return (<b>{' e ' + interest[0]}</b>)
          return (<b>{', ' + interest[0]}</b>)
        })}
      </p>
    )
  }

  const thirdCategory = () => {
    if (!tenantsChoices || !Object.keys(tenantsChoices)[2]) return null
    const chosen = Object.keys(tenantsChoices)[2]
    const { interestTotal } = tenantsChoices[chosen]
    const length = interestTotal.length
    if (length === 0) return null

    return (
      <p>
        Além dos interesses citados acima, os moradores da residência também mostram interesse na categoria <b>{chosen}</b>,
        e dentro dessa categoria, {length === 1 ? 'o interesse mais escolhido foi' : 'os interesses mais escolhidos foram'}
        {interestTotal.map((interest, index) => {
          if (index === 0) return (<b>  {interest[0]}</b>)
          if (length - 1 === index) return (<b>{' e ' + interest[0]}</b>)
          return (<b>{', ' + interest[0]}</b>)
        })}
      </p>
    )
  }

  return (
     <div className={opened ? "modal is-active" : "modal"}>
      <div className="modal-background" />
      <div className="modal-card column is-mobile is-three-fifths">
        <header className="modal-card-head" ref={ref}>
          <span className="modal-card-title is-size-5-mobile">
            Avaliar recomendação do quarto {room.description}
          </span>
          <button className="delete" aria-label="close" onClick={() => closeValuation()} />
        </header>
        <section
          ref={ref2}
          className={
            showValuationForm ?
            "modal-card-body valuation flip-card rotate" :
            "modal-card-body valuation flip-card"
          }
          style={{ height: headerHeight }}
        >
          <div className={showValuationForm ? "flip-card-inner rotate" : "flip-card-inner"}>
            <div className="first-column">
            <div className="score">
            <div className="score-number">{score}%</div>
            <div className="score-description">
              de score de afinidade
             <Tooltip content={scoreDesc}>
                <button>i</button>
              </Tooltip>
            </div>
          </div>
            <form onSubmit={handleSubmit}>
              <div className="stars control">
                <label>
                  Avalie a recomendação:
                </label>
                <ReactStars
                  count={5}
                  onChange={(value) => setStars(value)}
                  size={35}
                />,
              </div>
              <div className="comments control">
                <label htmlFor="comments">Conte-nos o que achou da recomendação (opcional):</label>
                <textarea
                  name="comments"
                  id="comments"
                  rows="4"
                  onChange={e => setComment(e.target.value)}
                />
              </div>
               <div className="control evaluate">
                  <CSRFToken csrf={getCookie('csrftoken')} />
                  <button type="submit" className="button is-primary is-fullwidth is-medium">
                    Avaliar
                  </button>
                 <button
                   type="button"
                   className="go-back-to-room-desc"
                   onClick={() => setShowValuationForm(false)}
                 >
                   Voltar para descrição do quarto
                 </button>
                </div>
                <div className="error">{error}</div>
            </form>
          </div>
            <div className="second-column">
            <div className="house-info">
              {firstCategory()}
              {secondCategory()}
              {thirdCategory()}
              <button
                className="go-to-valuation"
                onClick={() => setShowValuationForm(true)}
              >
                Ir para Avaliação
              </button>
            </div>
          </div>
          </div>
        </section>
      </div>
    </div>
  )
}