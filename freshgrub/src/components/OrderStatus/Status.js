import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import getAllOrders from "../../services/OrderStatus/getAllOrders";
import Loading from "../Loading/loading";
import Item from "./item";
import { addTokenToHeaders } from "../../services/utils/jwtTokenHelper";
import { toast } from "react-toastify";
// import ReactTooltip from "react-tooltip";

const Status = () => {
  // <ReactTooltip />;
  const localStorageData = sessionStorage.getItem("data");
  const token = JSON.parse(localStorageData).token;
  const decodedValue = jwtDecode(token);
  // console.log("decodedValue: ", decodedValue);
  const userId = decodedValue.id;
  // console.log("User id from status.js " + userId);
  const [loading, setLoading] = useState(true);

  const [orderedItems, setOrderedItems] = useState([]);

  //==================================================Pagination new ==============================================

  const [tab, setTab] = useState("Active");

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getOrderedItems = async () => {
    try {
      const res = await getAllOrders(userId, pageNumber, pageSize, tab);
      if (res.data?.success) {
        setOrderedItems(res.data);
        // console.log("order history data for vendor: ", res.data?.cartItems);
        console.log("Status.js order history data for vendor: ", res.data);

        // console.log(orderedItems);
      }
    } catch (error) {
      // console.error("Error fetching ordered items:", error);
      toast.error("Error fetching ordered items");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = orderedItems.totalPages;

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  //===========================================Without paging==============================================

  // const getOrderedItems = async () => {
  //   try {
  //     const res = await getAllOrders(userId);
  //     if (res.data?.success) {
  //       setOrderedItems(res.data);
  //       console.log("order history data for vendor: ", res.data?.cartItems);
  //       console.log(orderedItems);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching ordered items:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //===================================================================================================================

  const [modify, setModify] = useState(0);

  const updateTheOrders = () => {
    // console.log("called from child");
    setModify(modify + 1);
  };

  useEffect(() => {
    addTokenToHeaders();
  }, []);

  useEffect(() => {
    getOrderedItems();
    addTokenToHeaders();
  }, [modify, pageNumber, pageSize, tab]);

  if (loading) {
    return <Loading />;
  }

  if (
    !orderedItems ||
    !orderedItems.cartItems ||
    orderedItems.cartItems.length === 0
  ) {
    return (
      <div class="statusBody">
        <h1 className="noItems">
          Seems like you have not received any orders :({" "}
        </h1>
      </div>
    );
  }

  console.log("Button Clivked is " + tab);

  const renderPaginationControls = () => (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        Previous
      </button>
      <span>
        Page {pageNumber} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(pageNumber + 1)}
        disabled={pageNumber === totalPages}
      >
        Next
      </button>
    </div>
  );

  return (
    <>
      <div class="statusBody">
        <div className="subHeader">
          <p class="statusHeading">Orders</p>

          <div className="orderBtn">
            <button
              onClick={() => {
                setTab("Active");
                setPageNumber(1);
              }}
            >
              Active orders
            </button>
            <button
              onClick={() => {
                setTab("Completed");
                setPageNumber(1);
              }}
              style={{
                marginLeft: "1.3rem",
                backgroundColor: "Grey",
                color: "white",
              }}
            >
              &#10003; Completed orders
            </button>
          </div>
        </div>
        <div class="statusContainer">
          <div class="statusItems">
            <table>
              <tr>
                <th>OrderId</th>
                <th>Ordered on</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

              {tab === "Active" &&
                orderedItems.cartItems.map((item) => (
                  <Item
                    key={item.id}
                    {...item}
                    userId={userId}
                    updateStatus={updateTheOrders}
                  />
                ))}

              {tab === "Completed" &&
                orderedItems.cartItems.map((item) => (
                  <Item
                    key={item.id}
                    {...item}
                    userId={userId}
                    updateStatus={updateTheOrders}
                  />
                ))}
            </table>
          </div>
        </div>
        {renderPaginationControls()}
      </div>
    </>
  );
};

export default Status;
