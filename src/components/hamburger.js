import React, { useContext } from "react";
import { Context } from "../redux/store";
import "../scss/hamburger.scss";

function Hamburger({}) {
  const { state, dispatch } = useContext(Context);
  return (
    <button
      className={`hamburger hamburger--squeeze ${
        state.hamburgerOpen ? "is-active" : ""
      }`}
      type="button"
      onClick={() => {
        dispatch({
          type: "SET_MOBILE_MENU",
          payload: !state.hamburgerOpen,
        });
      }}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
}

export default Hamburger;
