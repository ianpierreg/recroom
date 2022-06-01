import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import RoomContainer from "./RoomContainer";
import InfiniteScroll from "react-infinite-scroller";

export default function ListRoomContainer({ endpoint, token }) {
  const pageSize = 10;
  const [data, setData] = useState();
  const [dataBound, setDataBound] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [listCount, setListCount] = useState(10);
  const [msg, setMsg] = useState();
  const ref = useRef(null);
  const scrollTo = () =>
    ref.current.scrollIntoView({
      behavior: "smooth",
    });

  const calculateCosineSimilarityByType = (r) => {
    const { future_tenant_interests, tenants_interests } = r;
    let frontEndScoreSum = 0;
    let csByTypeSum = {};
    let csByHouse;
    tenants_interests.forEach((tenant_interests) => {
      let csByTenant;
      Object.keys(tenant_interests).forEach((interest_type) => {
        let numerator = 0;
        if (typeof tenant_interests[interest_type].interests === "object") {
          tenant_interests[interest_type].interests.forEach((interest) => {
            const { interests, importance } =
              future_tenant_interests[interest_type];
            numerator +=
              interests.some((i) => i === interest) *
              importance *
              tenant_interests[interest_type].importance;
          });

          // debugger;
          const denominator1 = Math.sqrt(
            Math.pow(tenant_interests[interest_type].importance, 2) *
              tenant_interests[interest_type].interests.length
          );
          const denominator2 = Math.sqrt(
            Math.pow(future_tenant_interests[interest_type].importance, 2) *
              future_tenant_interests[interest_type].interests.length
          );

          tenant_interests[interest_type].csByType =
            numerator / (denominator1 * denominator2);

          if (!csByTypeSum[interest_type]) {
            csByTypeSum[interest_type] =
              tenant_interests[interest_type].csByType;
          } else {
            csByTypeSum[interest_type] +=
              tenant_interests[interest_type].csByType;
          }

          if (!tenant_interests.csByTenantSum) {
            tenant_interests.csByTenantSum =
              tenant_interests[interest_type].csByType;
          } else {
            tenant_interests.csByTenantSum +=
              tenant_interests[interest_type].csByType;
          }
        }
      });

      tenant_interests.csByTenant =
        tenant_interests.csByTenantSum /
        (Object.keys(tenant_interests).length - 1);

      frontEndScoreSum += tenant_interests.csByTenant;
    });

    console.log({
      future_tenant_interests,
      tenants_interests,
      r,
      sum: frontEndScoreSum / tenants_interests.length,
      csByTypeSum,
    });

    Object.keys(csByTypeSum).forEach((c) => {
      csByTypeSum[c] = (csByTypeSum[c] / tenants_interests.length).toFixed(2);
    });

    return { ...r, csByTypeSum };
  };

  const getRoomValuations = () => {
    const conf = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    fetch("/valuations/", conf)
      .then((response) => {
        if (response.status !== 200) return null;
        return response.json();
      })
      .then((res) => {
        console.log("valuations", res);
        if (!res || !res.valuations) return;
        let roomsBound = data.rooms.map((room) => {
          room.valuation = res.valuations.find(
            (valuation) => valuation.room === room.id
          );

           room = calculateCosineSimilarityByType(room);
           room.value =
             room.tenants_interests.reduce(
               (total, next) => total + next.csByTenant,
               0
             ) / room.tenants_interests.length;
          //  setScore((value * 100).toFixed(2).replace(".", ","));
          //  setNewRoom(rr);
          return room;
        });

        roomsBound = roomsBound.sort((a, b) => b.value - a.value).map((r, index) => ({ ...r, position: index+1}))

        console.log('aqui', roomsBound)
       
        setDataBound({ ...data, rooms: roomsBound });
      });
  };

  useEffect(() => {
    if (!data || !data.rooms) return;
    getRoomValuations();
  }, [data]);

  const nextPage = (page) => {
    if (!dataBound || !dataBound.rooms) return;
    if (dataBound.rooms.length <= listCount) {
      setHasMore(false);
      return;
    }
    if (page * pageSize === listCount) return;
    console.log("next page", page);
    if (!showButton) setShowButton(true);
    setListCount((count) => count + pageSize);
  };

  useEffect(() => {
    const conf = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    fetch(endpoint, conf)
      .then((response) => {
        if (response.status !== 200) setData();
        return response.json();
      })
      .then((res) => {
        console.log("res", res);
        if (!res) return;
        if (res.msg) {
          console.log("msg", res.msg);
          setMsg(res.msg);
        } else if (res.rooms) {
          setData(res);
          setMsg();
        }
      });
  }, [token]);

  const renderRooms = () => {
    if (!dataBound) return;

    const { load, rooms } = dataBound;
    if (load === 0) return null;
    if (rooms && rooms.length > 0) {
      console.log("listCount", listCount);
      const roomComponents = rooms.slice(0, listCount).map((room, index) => {
        let medalPath;
        switch (index) {
          case 0:
            medalPath = "/media/goldmedal.png";
            break;
          case 1:
            medalPath = "/media/silvermedal.png";
            break;
          case 2:
            medalPath = "/media/bronzemedal.png";
            break;
          default:
            medalPath = undefined;
        }
        return (
          <RoomContainer
            position={index + 1}
            room={room}
            key={room.id}
            medal={medalPath}
          />
        );
      });

      return roomComponents;
    } else {
      return <div>Nenhum quarto cadastrado.</div>;
    }
  };

  useEffect(() => {
    console.log("set msg", msg);
  }, [msg]);

  return (
    <section className="section" ref={ref}>
      <h2 className="list-title">Ranking de quartos</h2>
      <div className="container">
        {msg ? (
          <h3 className="message-answer-question">{msg}</h3>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={nextPage}
            hasMore={hasMore}
            loader={
              <div className="loader-gif" key={0}>
                <img
                  src="/media/ux-laws-loading.gif"
                  alt="icone de carregamento"
                />
              </div>
            }
          >
            {renderRooms()}
          </InfiniteScroll>
        )}
      </div>
      {showButton && (
        <div className="go-top-wrapper">
          <button className="go-top" onClick={scrollTo}>
            Topo do Ranking
          </button>
        </div>
      )}
    </section>
  );
}
