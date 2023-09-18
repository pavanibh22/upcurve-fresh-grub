import React from "react";
import "./StatusTracker.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";

const StatusTracker = ({ orderStatus }) => {
  const isOrderTaken = orderStatus === "Order Taken";

  return (
    <div className="status-tracker">
      {!isOrderTaken ? (
        <>
          <div className={`status-step ${orderStatus === "Accepted" ? "current" : "dim"}`}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: "20px", color: orderStatus === "Accepted" ? "green" : "dimgray" }}/> Accepted
          </div>
          <div className="status-arrow">→</div>
          <div className={`status-step ${orderStatus === "Preparing" ? "current" : "dim"}`}>
            <FontAwesomeIcon icon={faClock} style={{ fontSize: "20px", color: orderStatus === "Preparing" ? "orange" : "dimgray" }}/> Preparing
          </div>
          <div className="status-arrow">→</div>
          <div className={`status-step ${orderStatus === "Ready" ? "current" : "dim"}`}>
            <FontAwesomeIcon icon={faHamburger} style={{ fontSize: "20px", color: orderStatus === "Ready" ? "red" : "dimgray" }}/> Ready
          </div>
        </>
      ) : (
        <div className="status-label"> 🎉 Received </div>
      )}
    </div>
  );
};

export default StatusTracker;
