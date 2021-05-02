import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import '../../../static/frontend/css/common.css';
import NumberFormat from 'react-number-format'
import InterestOptionContainer from "./InterestOptionContainer";

export default function InterestsContainer({ endpoint, show, close }) {
  const [items, setItems] = useState([])
  const [interests, setInterests] = useState([])
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => { callWebservice() }, [show])

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
      return <div className="no-new-questions">
        Nenhuma pergunta disponível no momento!
      </div>
    }

  }

  const removeItem = (arr) => {
    let what, a = arguments, L = a.length, ax
    while (L > 1 && arr.length) {
      what = a[--L]
      while ((ax= arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1)
      }
    }
    return arr
  }

  const handleChange = e => {
    let itemsCopy = [...items];
    let checkbutton =  document.getElementById(e.target.id)
    let parent = checkbutton.parentElement;
    if(!checkbutton.checked){
      removeItem(itemsCopy, e.target.value)
      parent.classList.remove("background-checked")
    } else  {
      itemsCopy.push(e.target.value)
      parent.classList.add("background-checked")
    }
    setItems(itemsCopy)
  }

  const handleSubmit = e => {
    e.preventDefault()
    callWebservice()
  }

  const callWebservice = () => {
    setLoading(true)

    const conf = {
      method: "post",
      body: JSON.stringify(items),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    }
    let _this = this
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
      } else {
        setInterests([])
      }
    }).finally(() => {
      setLoading(false)
      setItems([])
    })
  }

  const closeModal = () => {
    close()
    location.reload()
  }

  return (
    <div className={show ? "modal is-active" : "modal"}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div className="interest-title-wrapper">
            <h2 className="modal-card-title is-size-5-mobile">{type}</h2>
            <h3>{description}</h3>
          </div>
          <button className="delete" aria-label="close" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="columns is-centered">
            <div className="column is-10">
              {loading ? (<h3>Carregando perguntas ...</h3>) : (
                <form onSubmit={handleSubmit}>
                {renderOptions()}
                <div className="control">
                  {interests.length > 0 ? (
                    <button type="submit" className="button is-primary is-fullwidth is-medium">
                      Salvar :)
                    </button>
                  ) : (
                    <button type="button" className="button is-primary is-fullwidth is-medium" onClick={closeModal}>
                      Ok, eu volto depois!
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
  )
}