import React, { useEffect, useState } from "react";
import "./History.css";

const Item = ({ _id, userId, item, qty, date, time, newStatus }) => {
  const { id, stallId, menuItemName, price, menuItemImage } = item[0];
  const step1Style = newStatus === "Order Placed" ? { color: "green" } : {};
  const step2Style = newStatus === "In Preparing" ? { color: "green" } : {};
  const step3Style = newStatus === "Ready" ? { color: "green" } : {};

  return (
    <>
      <div class="item">
        <div class="items">
          <div class="image">
            <img
              style={{ height: "6rem" }}
              src={`data:image/jpeg;base64,${menuItemImage}`}
              alt="{menuItemName}"
            />
          </div>
          <div class="info">
            <h3 className="itemName">{menuItemName}</h3>
            <small>Quantity : {qty}</small>
          </div>
          <div class="price">&#8377; {price * qty}</div>
          <div class="deliver">
          <p className="dot1" style={step1Style}></p>
            <span style={step1Style}>Order Placed</span>
            <hr style={{ borderColor: step2Style.color }} />
            <p className="dot2" style={step2Style}></p>
            <span style={step2Style}>In Preparing</span>
            <hr style={{ borderColor: step3Style.color }} />
            <p className="dot3" style={step3Style}></p>
            <span style={step3Style}>Ready</span>
          </div>
        </div>
      </div>
      {/* <hr /> */}
    </>
  );
};
export default Item;
