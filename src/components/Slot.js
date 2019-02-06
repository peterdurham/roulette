import React from "react";
import PropTypes from "prop-types";

import chip1 from "../img/chip1.jpg";
import chip5 from "../img/chip5.jpg";
import chip10 from "../img/chip10.jpg";
import chip25 from "../img/chip25.jpg";
import chip100 from "../img/chip100.jpg";

const Slot = ({ betAmount, betValue, betSelected, selectBetHandler }) => {
  const red = [
    1,
    3,
    5,
    7,
    9,
    12,
    14,
    16,
    18,
    19,
    21,
    23,
    25,
    27,
    30,
    32,
    34,
    36
  ];
  const black = [
    2,
    4,
    6,
    8,
    10,
    11,
    13,
    15,
    17,
    20,
    22,
    24,
    26,
    28,
    29,
    31,
    33,
    35
  ];
  let greenSmall = ["3rd row", "2nd row", "1st row"];
  let greenMiddle = ["1-18", "EVEN", "Red", "Black", "ODD", "19-36"];
  let greenLarge = ["1st 12", "2nd 12", "3rd 12"];

  let chip1Display, chip5Display, chip10Display, chip25Display, chip100Display;

  if (betAmount === 1) {
    chip1Display = <img className="chip__small" src={chip1} alt="chip1" />;
  } else if (betAmount === 5) {
    chip5Display = <img className="chip__small" src={chip5} alt="chip1" />;
  } else if (betAmount === 10) {
    chip10Display = <img className="chip__small" src={chip10} alt="chip" />;
  } else if (betAmount === 25) {
    chip25Display = <img className="chip__small" src={chip25} alt="chip" />;
  } else if (betAmount === 100) {
    chip100Display = <img className="chip__small" src={chip100} alt="cp" />;
  }

  let slotClass;

  if (red.indexOf(betValue) > -1) {
    slotClass =
      "board-number red" + (betSelected === betValue ? " selected" : "");
  } else if (black.indexOf(betValue) > -1) {
    slotClass =
      "board-number black" + (betSelected === betValue ? " selected" : "");
  } else if (greenSmall.indexOf(betValue) > -1) {
    slotClass = "row-bet" + (betSelected === betValue ? " selected" : "");
  } else if (greenMiddle.indexOf(betValue) > -1) {
    slotClass =
      "one-of-two-bet" + (betSelected === betValue ? " selected" : "");
  } else if (greenLarge.indexOf(betValue) > -1) {
    slotClass = "thirds-bet" + (betSelected === betValue ? " selected" : "");
  } else if (betValue === 0 || betValue === "0") {
    slotClass =
      "zero__bet" + (betSelected === betValue ? " selected__zero" : "");
  }

  let display = (
    <div className={slotClass} onClick={() => selectBetHandler(betValue)}>
      {betValue}
      {chip1Display}
      {chip5Display}
      {chip10Display}
      {chip25Display}
      {chip100Display}
    </div>
  );

  return <div className="board__chips">{display}</div>;
};

Slot.propTypes = {
  betAmount: PropTypes.number,
  betValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  betSelected: PropTypes.string,
  selectBetHandler: PropTypes.func
};

export default Slot;
