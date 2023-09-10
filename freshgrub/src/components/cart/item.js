import React, { useEffect, useState } from "react";
// import incrementItem from "../../services/Cart/incrItem"
import addToCart from "../../services/Cart/addToCart";
import decrement from "../../services/Cart/decrementItem";
import remove from "../../services/Cart/deleteItem";
import { toast } from "react-toastify";

const Item = ({ _id, userId, item, qty, updateParent }) => {
  console.log("_id" + _id);
  const [qtyy, setQtyy] = useState(qty);
  const [disabled, setDisabled] = useState(false);

  const increment = async () => {
    setDisabled(true);
    addToCart(userId, {
      itemId: id,
      qty: qty,
      isOrdered: false,
    }).then((r) =>
      r.data?.success
        ? (setQtyy(qtyy + 1), updateParent(), setDisabled(false))
        : toast.error("Failed: " + r?.data?.message, setDisabled(false))
    );
  };

  const decrementItem = async () => {
    setDisabled(true);
    decrement(userId, {
      itemId: id,
    }).then((r) =>
      r.data?.success
        ? (setQtyy(qtyy - 1), updateParent(), setDisabled(false))
        : toast.error("Failed: " + r?.data?.message, setDisabled(false))
    );
  };

  const deleteItem = async () => {
    setDisabled(true);
    remove(userId, {
      itemId: id,
    }).then((r) =>
      r.data?.success
        ? updateParent()
        : toast.error("Failed: " + r?.data?.message, setDisabled(false))
    );
  };

  const { id, stallId, menuItemName, price, menuItemImage } = item[0];
  return (
    <>
      <div className="items-info1">
        <div className="product-img1">
          <img src={`data:image/jpeg;base64,${menuItemImage}`} alt="product1" />
        </div>
        <div className="title1">
          <h2>{menuItemName} </h2>
        </div>

        <div className="plus-minus1">
          <button onClick={() => decrementItem()} disabled={disabled}>
            <i className="fa-solid fa-minus"></i>
          </button>
          <p>{qtyy}</p>
          <button onClick={() => increment()} disabled={disabled}>
            <i className="fa-solid fa-plus add"></i>
          </button>
        </div>

        <div className="price1">
          <h3>&#8377; {price * qty}</h3>
        </div>

        <div className="remove-item1">
          <button onClick={() => deleteItem()}>
            <i className="fa-solid fa-trash-alt remove"></i>
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Item;
