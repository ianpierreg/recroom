import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import '../../../static/frontend/css/common.css';
import NumberFormat from 'react-number-format'
import InterestOptionContainer from "./InterestOptionContainer";
import { Tooltip } from "@trendmicro/react-tooltip";
import '@trendmicro/react-tooltip/dist/react-tooltip.css'

export default function InterestsContainer({ endpoint, show, close }) {
  const [items, setItems] = useState([])
  const [interests, setInterests] = useState([])
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [importance, setImportance] = useState()
  const [importanceBlank, setImportanceBlank] = useState(false)
  const [interestsBlank, setInterestsBlank] = useState(false)
  const [count, setCount] = useState('?/?')

  useEffect(() => { callWebservice() }, [show])

  const handleChangeRadio = e => setImportance(e.target.value)

  const renderOptions = () => {
    if(interests.length > 0) {
      let optionsComponents = interests.map((interest) =>
        <InterestOptionContainer
          interest={interest}
          handleChange={handleChange}
          key={interest.id}
        />
      )

      const size = 2; let arrayOfArrays = [];
      for (let i=0; i<optionsComponents.length; i+=size) {
        arrayOfArrays.push(optionsComponents.slice(i,i+size));
      }

      let arrayOfColumns = []
      for(let j = 0; j < arrayOfArrays.length; j++) {
        arrayOfColumns.push(
          <div className="columns tenant-landlord interests-columns">
            {
              arrayOfArrays[j].map((option) => option)
            }
          </div>
        )
      }

      return arrayOfColumns.map((column) => column)
    } else {
      if (type !== '') setType('')
      if (description) setDescription(undefined)

      return (
        <div className="no-new-questions">
          Perfil completo. Confira a lista de quartos selecionados!
        </div>
      )
    }

  }

  const handleChange = e => {
    debugger
    let itemsCopy = [...items]
    let checkbutton =  document.getElementById(e.target.id)
    let parent = checkbutton.parentElement.parentElement
    if(!checkbutton.checked) {
      itemsCopy = itemsCopy.filter(item => item !== e.target.value)
      parent.classList.remove("background-checked")
    } else {
      itemsCopy.push(e.target.value)
      parent.classList.add("background-checked")
    }

    setItems(itemsCopy)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (interests.length > 0 && items.length === 0) {
      setInterestsBlank(true);
      return;
    }

    callWebservice()
  }

  const callWebservice = () => {
    let conf = {
      method: "POST",
      body: JSON.stringify({ items, importance }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    }


    setInterestsBlank(false);
    if (interests.length > 0 && items.length > 0 && importance === undefined) {
      setImportanceBlank(true)
      return
    } 
    
    if (items.length === 0 && importance !== undefined) {
      const allItems = interests.map(i => i.id)
      conf = { ...conf, body: JSON.stringify({ items: allItems, importance: 0 }) }
    }

    setImportanceBlank(false)
    setLoading(true)

    fetch(endpoint, conf).then(response => {
      if (response.ok) {
        if (response.status !== 200) {
          return null
        }
      }

      return response.json();
    }).then(data => {
      if(data.interests) {
        setType(data.type)
        setInterests(data.interests)
        setDescription(data.description)
        setCount(`${data.type_answered+1 || 0}/${data.total_types || 0}`);
      } else {
        setInterests([])
      }

      setImportance(undefined)
    }).finally(() => {
      setLoading(false)
      setItems([])
    })
  }

  const closeModal = () => {
    close()
    location.reload()
  }

  const importanceDesc = 'O nível de importância é utilizado para aplicar peso no cálculo de similaridade, para determinados interesses do usuário.' +
    'Quão importante é para você esse tópico? Quanto maior o valor, maior impacto desse tipo de interesse no cálculo final.'
  return (
    <div className={show ? "modal is-active" : "modal"}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div className="interest-title-wrapper">
            <h2 className="modal-card-title is-size-5-mobile">
              {type} {interests.length > 0 && count}
              {description && (
                <Tooltip content={description}>
                  <button>i</button>
                </Tooltip>
              )}
            </h2>
          </div>
          <button className="delete" aria-label="close" onClick={closeModal} />
        </header>
        <section
          className="modal-card-body"
          style={{ maxHeight: "calc(100vh - 61px)" }}
        >
          <div className="columns is-centered">
            <div className="column is-10">
              {loading ? (
                <div className="loader-gif">
                  <img
                    src="/media/ux-laws-loading.gif"
                    alt="icone de carregamento"
                  />
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {renderOptions()}
                  <div className="control">
                    {interests.length > 0 ? (
                      <React.Fragment>
                        <div className="importance">
                          <label
                            htmlFor="importance"
                            className="importance-interest"
                          >
                            Importância deste tópico para você
                            <Tooltip content={importanceDesc}>
                              <button>i</button>
                            </Tooltip>
                            :{" "}
                          </label>
                          <div className="tenant-landlord importance field-body">
                            <div className="field">
                              <input
                                id="0"
                                className="is-checkradio"
                                type="radio"
                                name="importance"
                                value="0"
                                onChange={handleChangeRadio}
                              />
                              <label className="label-radio" htmlFor="0">
                                0
                              </label>
                            </div>
                            <div className="field">
                              <input
                                id="1"
                                className="is-checkradio"
                                type="radio"
                                name="importance"
                                value="1"
                                onChange={handleChangeRadio}
                              />
                              <label className="label-radio" htmlFor="1">
                                1
                              </label>
                            </div>
                            <div className="field">
                              <input
                                id="2"
                                className="is-checkradio"
                                type="radio"
                                name="importance"
                                value="2"
                                onChange={handleChangeRadio}
                              />
                              <label className="label-radio" htmlFor="2">
                                2
                              </label>
                            </div>
                            <div className="field">
                              <input
                                id="3"
                                className="is-checkradio"
                                type="radio"
                                name="importance"
                                value="3"
                                onChange={handleChangeRadio}
                              />
                              <label className="label-radio" htmlFor="3">
                                3
                              </label>
                            </div>
                            <div className="field">
                              <input
                                id="4"
                                className="is-checkradio"
                                type="radio"
                                name="importance"
                                value="4"
                                onChange={handleChangeRadio}
                              />
                              <label className="label-radio" htmlFor="4">
                                4
                              </label>
                            </div>
                            <div className="field">
                              <input
                                id="5"
                                className="is-checkradio"
                                type="radio"
                                name="importance"
                                value="5"
                                onChange={handleChangeRadio}
                              />
                              <label className="label-radio" htmlFor="5">
                                5
                              </label>
                            </div>
                          </div>
                        </div>
                        {interestsBlank && (
                          <div className="error">
                            Você precisa marcar pelo menos uma opção de
                            interesse para continuar.
                          </div>
                        )}
                        {importanceBlank && (
                          <div className="error">
                            Não é possível enviar uma resposta sem indicar a
                            importância do tópico.
                          </div>
                        )}
                        <button
                          type="submit"
                          className="button is-primary is-fullwidth is-medium"
                        >
                          Salvar :)
                        </button>
                      </React.Fragment>
                    ) : (
                      <button
                        type="button"
                        className="button is-primary is-fullwidth is-medium"
                        onClick={closeModal}
                      >
                        Ok
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}