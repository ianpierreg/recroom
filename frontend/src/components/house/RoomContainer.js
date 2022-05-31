import React, { useState, useEffect } from "react";
import RoomItem from "./RoomItem";
import RoomValuation from "./RoomValuation";
import "../../../static/frontend/css/common.css";

export default function RoomContainer({ room, medal, position }) {
  const [valuationOpened, setValuationOpened] = useState(false);
  const [newRoom, setNewRoom] = useState(room)
  const [score, setScore] = useState(
    (room.value * 100).toFixed(2).replace(".", ",")
  );
  const [compoundRoom, setCompoundRoom] = useState(newRoom);

  useEffect(() => {
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

      const rr = calculateCosineSimilarityByType(room)
      const value =
        rr.tenants_interests.reduce(
          (total, next) => total + next.csByTenant,
          0
        ) / rr.tenants_interests.length;
      setScore((value * 100).toFixed(2).replace(".", ","));
      setNewRoom(rr)

  }, [])

  return (
    <React.Fragment>
      <RoomItem
        room={compoundRoom}
        medal={medal}
        score={score}
        openValuation={() => setValuationOpened(true)}
      />
      <RoomValuation
        room={newRoom}
        score={score}
        position={position}
        opened={valuationOpened}
        closeValuation={(valuation) => {
          if (valuation) setCompoundRoom({ ...newRoom, valuation });
          setValuationOpened(false);
        }}
      />
    </React.Fragment>
  );
}
