const MyModal = ({ amt, closeModal }) => {
  return (
    <>
      <div className="modal-wrapper"></div>
      <div className="modal-container">
        <h3 style={{ color: "white" }}>Your wallet balance is {amt}</h3>
        <button onClick={closeModal}>OK</button>
      </div>
    </>
  );
};

export default MyModal;

// import React from "react";

// const MyModal = ({ amt, closeModal }) => {
//   return (
//     <div className="modal-container">
//       <h3>Your wallet balance is {amt}</h3>
//       <button onClick={closeModal}>OK</button>
//     </div>
//   );
// };

// export default MyModal;
