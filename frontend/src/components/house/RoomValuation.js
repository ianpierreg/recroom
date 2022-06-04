import React, { useState, useEffect, useRef } from "react";
import ReactStars from "react-rating-stars-component";
import CSRFToken from "../common/csrftoken";
import Swal from "sweetalert2";
import { Tooltip } from "@trendmicro/react-tooltip";
import "@trendmicro/react-tooltip/dist/react-tooltip.css";
import "../../../static/frontend/css/common.css";
import useWindowSize from "../home/WindowSize";

export default function RoomValuation({
  room,
  score,
  opened,
  closeValuation,
  position,
}) {
  const [stars, setStars] = useState();
  const [comment, setComment] = useState();
  const [error, setError] = useState("");
  const [tenantsChoices, setTenantChoices] = useState();
  const size = useWindowSize();
  const scoreDesc =
    "O score de afinidade é calculado baseado nas respostas" +
    " e interesses do seu perfil e dos perfis dos moradores da residência a qual esse quarto pertence.";
  const valuationDesc = "Por favor, nos ajude avaliando a recomendação";
  const [showValuationForm, setShowValuationForm] = useState(false);
  const [scoreByType, setScoreByType] = useState();
  const [headerHeight, setHeaderHeight] = useState("100vh");
  const ref = useRef();
  const ref2 = useRef();

  useEffect(() => {
    const baseHeight = window.innerWidth < 780 ? '100vh' : '85vh'
    setHeaderHeight(`calc(${baseHeight} - ${ref.current.offsetHeight}px)`);
    if (opened) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "unset";
  }, [ref, opened]);

  useEffect(() => {
    ref2.current.scrollTop = 0;
  }, [ref2, opened, showValuationForm]);

  useEffect(() => {
    setShowValuationForm(false);
  }, [opened]);

  const getCookie = (cookieName) => {
    let cookieValue = document.cookie;
    let cookieStart = cookieValue.indexOf(" " + cookieName + "=");
    if (cookieStart === -1) {
      cookieStart = cookieValue.indexOf(cookieName + "=");
    }
    if (cookieStart === -1) {
      cookieValue = null;
    } else {
      cookieStart = cookieValue.indexOf("=", cookieStart) + 1;
      let cookieEnd = cookieValue.indexOf(";", cookieStart);
      if (cookieEnd === -1) {
        cookieEnd = cookieValue.length;
      }
      cookieValue = unescape(cookieValue.substring(cookieStart, cookieEnd));
    }
    return cookieValue;
  };

  useEffect(() => {
    const { future_tenant_interests, tenants_interests, csByTypeSum } = room;
    if (!csByTypeSum) return;

    //it will get the occurrences of a interest in the future tenant and everyone in the house
    const interestRecurrence = {};
    const interestsByTypes = [...tenants_interests, future_tenant_interests];
    Object.keys(future_tenant_interests).forEach((type) => {
      future_tenant_interests[type].interests.forEach((interest) => {
        debugger;
        tenants_interests.forEach((tenant_interest) => {
          const found = tenant_interest[type].interests.find(
            (i) => i === interest
          );
          if (found && future_tenant_interests[type].importance > 0) {
            if (!interestRecurrence[type]) {
              interestRecurrence[type] = {
                interests: { [interest]: 1 },
                value: csByTypeSum[type],
              };
            } else {
              if (!interestRecurrence[type].interests[interest]) {
                interestRecurrence[type].interests[interest] = 1;
              } else {
                interestRecurrence[type].interests[interest] += 1;
              }
            }
          }
        });
      });
    });

    const sorted = {};
    Object.keys(interestRecurrence)
      .sort(function (a, b) {
        return interestRecurrence[b].value - interestRecurrence[a].value;
      })
      .forEach(function (key) {
        sorted[key] = interestRecurrence[key];
      });
    setScoreByType(sorted);
    console.log({ sorted });
  }, [room]);

  const handleSubmit = (e) => {
    const csrftoken = getCookie("csrftoken");
    e.preventDefault();

    if (!stars) {
      setError(
        'Por favor, avalie o quarto através das "estrelas" no intervalo entre 1 e 5.'
      );
      return;
    } else setError("");

    const valuation = {
      stars,
      comment,
      score: room.value,
      ranking_position: position,
      room_id: room.id,
    };

    console.log("valuation", valuation);
    const conf = {
      method: "post",
      body: JSON.stringify(valuation),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
        Authorization: localStorage.getItem("token"),
      },
    };
    fetch("/evaluate/", conf)
      .then((response) => {
        if (response.status !== 200) return null;
        return response.json();
      })
      .then((data) => {
        if (data) {
          if (data.valuation === 10) {
            Swal.fire(
              "Todas as residencias foram avaliados",
              "Obrigado por participar do experimento :)",
              "success"
            );
          } else {
            Swal.fire(
              "Avaliação bem sucedida",
              "Obrigado por avaliar a recomendação :)",
              "success"
            );
          }

          closeValuation(valuation);
        } else {
          Swal.fire("Erro ao avaliar", "Tente novamente", "error");
        }
      });
  };

  const amountInWords = {
    1: "um",
    2: "dois",
    3: "três",
    4: "quatro",
    5: "cinco",
  };
  const valuationText = (key, item) => {
    return (
      <div key={key}>
        <p>
          O seu score de afinidade considerando apenas o tipo de interesse{" "}
          <b>"{key}"</b> para essa residência (que contém{" "}
          <b>{amountInWords[room.tenants_interests.length]}</b>{" "}
          {room.tenants_interests.length === 1 ? "morador" : "moradores"}) é{" "}
          <b>{(item.value * 100).toFixed()}%</b> e dentro desse tipo de
          interesse:
          <Tooltip
            tooltipClassName="infotip-my-choices"
            content={
              <div>
                Abaixo está a lista das suas escolhas para o tipo de interesse{" "}
                {<b>"{key}"</b>} (importância de{" "}
                {<b>{room.future_tenant_interests[key].importance}</b>}
                ):{" "}
                <ul>
                  {room.future_tenant_interests[key].interests.map((d) => (
                    <li key={d}>"{d}"</li>
                  ))}
                </ul>
              </div>
            }
          >
            <button className="infotip-button">i</button>
          </Tooltip>
        </p>
        <ul>
          {Object.keys(item.interests)
            .sort(function (a, b) {
              return item.interests[b] - item.interests[a];
            })
            .map((key2) =>
              item.interests[key2] == 1 ? (
                <li key={key2}>
                  Você e mais <b>um</b> morador da residência selecionaram{" "}
                  <b>"{key2}"</b>;
                </li>
              ) : (
                <li key={key2}>
                  Você e mais <b>{amountInWords[item.interests[key2]]}</b>{" "}
                  moradores da residência selecionaram <b>"{key2}"</b>;
                </li>
              )
            )}
        </ul>
      </div>
    );
  };

  return (
    <div className={opened ? "modal is-active" : "modal"}>
      <div className="modal-background" />
      <div
        className="modal-card column is-mobile is-three-fifths"
        style={{ padding: 0 }}
      >
        <header className="modal-card-head" ref={ref}>
          <span className="modal-card-title is-size-5-mobile">
            Avaliar recomendação {room.description}
          </span>
          <button
            className="delete"
            aria-label="close"
            onClick={() => closeValuation()}
          />
        </header>
        <section
          ref={ref2}
          className={
            showValuationForm
              ? "modal-card-body valuation flip-card rotate"
              : "modal-card-body valuation flip-card"
          }
          style={{ height: headerHeight }}
        >
          <div
            className={
              showValuationForm ? "flip-card-inner rotate" : "flip-card-inner"
            }
          >
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
                  <label>Avalie a recomendação:</label>
                  <ReactStars
                    count={5}
                    onChange={(value) => setStars(value)}
                    size={35}
                  />
                  ,
                </div>
                <div className="comments control">
                  <label htmlFor="comments">
                    Conte-nos o que achou da recomendação (opcional):
                  </label>
                  <textarea
                    name="comments"
                    id="comments"
                    rows="4"
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="control evaluate">
                  <CSRFToken csrf={getCookie("csrftoken")} />
                  <button
                    type="submit"
                    className="button is-primary is-fullwidth is-medium"
                  >
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
                {scoreByType &&
                  Object.entries(scoreByType).map(([key, item], index) => {
                    console.log({ key, item, index, position: room.position })
                    if (room.position === 1 && index < 3)
                      return valuationText(key, item);
                    if (
                      [2, 3].includes(room.position) &&
                      index > 0 &&
                      index < 4
                    )
                      return valuationText(key, item);
                    if (room.position === 4 && index > 1 && index < 5)
                      return valuationText(key, item);
                    if (room.position === 5 && index > 2 && index < 6)
                      return valuationText(key, item);
                    if (
                      [6, 7].includes(room.position) &&
                      index > 3 &&
                      index < 7
                    )
                      return valuationText(key, item);
                    if (room.position === 8 && index > 4 && index < 8)
                      return valuationText(key, item);

                    if (room.position === 9 && index > 5 && index < 9)
                      return valuationText(key, item);

                    if (room.position === 10 && index > 6 && index < 10)
                      return valuationText(key, item);
                  })}
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
  );
}
