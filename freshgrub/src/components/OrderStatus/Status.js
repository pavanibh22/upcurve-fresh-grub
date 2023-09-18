import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import getAllOrders from "../../services/OrderStatus/getAllOrders";
import Loading from "../Loading/loading";
import Item from "./item";
import { addTokenToHeaders } from "../../services/utils/jwtTokenHelper";

const Status = () => {
  const localStorageData = sessionStorage.getItem("data");
  const token = JSON.parse(localStorageData).token;
  const decodedValue = jwtDecode(token);
  console.log("decodedValue: ", decodedValue);
  const userId = decodedValue.id;
  console.log("User id from status.js " + userId);
  const [loading, setLoading] = useState(true);

  const [orderedItems, setOrderedItems] = useState([]);

  const getOrderedItems = async () => {
    try {
      const res = await getAllOrders(userId);
      if (res.data?.success) {
        setOrderedItems(res.data);
        console.log("order history data for vendor: ", res.data?.cartItems);
        console.log(orderedItems);
      }
    } catch (error) {
      console.error("Error fetching ordered items:", error);
    } finally {
      setLoading(false);
    }
  };

  // const groupedItems = new Map();

  // orderedItems.cartItems.forEach((item) => {
  //   const dateArray = item.date;
  //   const timeArray = item.time;

  //   // Convert date and time arrays to strings
  //   const formattedDatetime = `${dateArray[0]}-${dateArray[1]
  //     .toString()
  //     .padStart(2, "0")}-${dateArray[2]
  //     .toString()
  //     .padStart(2, "0")} ${timeArray[0]
  //     .toString()
  //     .padStart(2, "0")}:${timeArray[1]
  //     .toString()
  //     .padStart(2, "0")}:${timeArray[2].toString().padStart(2, "0")}`;

  //   if (!groupedItems.has(formattedDatetime)) {
  //     groupedItems.set(formattedDatetime, []);
  //   }
  //   groupedItems.get(formattedDatetime).push(item);
  // });

  // const sortedGroups = Array.from(groupedItems.entries()).sort(
  //   ([datetimeA], [datetimeB]) => {
  //     return new Date(datetimeB) - new Date(datetimeA);
  //   }
  // );

  // Function to format date for display
  const formatDateForDisplay = (datetimeString) => {
    const datetime = new Date(datetimeString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      // Optional: Use 12-hour time format
    };
    return datetime.toLocaleDateString("en-US", options);
  };

  const [modify, setModify] = useState(0);

  const updateTheOrders = () => {
    console.log("called from child");
    setModify(modify + 1);
  };

  useEffect(() => {
    addTokenToHeaders();
  }, []);

  useEffect(() => {
    getOrderedItems();
  }, [modify]);

  if (loading) {
    return <Loading />;
  }

  if (!orderedItems || orderedItems.cartItems.length === 0) {
    return (
      <div class="statusBody">
        <h1 className="noItems">
          Seems like you have not received any orders :({" "}
        </h1>
      </div>
    );
  }


  return (
    <>
      <div class="statusBody">
        <p class="statusHeading">Orders</p>
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

              {/* =========================this if for sorting of orders in descending order===================== */}
              {/* {sortedGroups.map(([datetime, items]) => (
                <React.Fragment key={datetime}>
                  {items
                    .sort(
                      (a, b) =>
                        new Date(`${b.date} ${b.time}`) -
                        new Date(`${a.date} ${a.time}`)
                    )
                    .map((item) => (
                      <Item
                        key={item.id}
                        {...item}
                        userId={userId}
                        updateStatus={updateTheOrders}
                      />
                    ))}
                </React.Fragment>
              ))} */}

              {/* If in case sorting doesnt work then we can go with the below code  */}
              {orderedItems.cartItems.map((item) => (
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
      </div>
    </>
  );
};

export default Status;
