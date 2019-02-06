import React from "react";
import PropTypes from "prop-types";

import chip1 from "../img/chip1.jpg";
import chip5 from "../img/chip5.jpg";
import chip10 from "../img/chip10.jpg";
import chip25 from "../img/chip25.jpg";
import chip100 from "../img/chip100.jpg";

const Options = ({ chipSelected, selectChip, clearBets, spinWheel }) => {
  return (
    <div>
      <div className="bet__options">
        <div className="bet__options--label">Select bet: </div>
        <div
          className={"bet__chips" + (chipSelected === 100 && " bet__selected")}
          onClick={() => selectChip(100)}
        >
          <img className="bet__image" src={chip100} alt="100 chip" />
        </div>
        <div
          data-testid="bet-25"
          className={"bet__chips" + (chipSelected === 25 && " bet__selected")}
          onClick={() => selectChip(25)}
        >
          <img className="bet__image" src={chip25} alt="25 chip" />
        </div>
        <div
          className={"bet__chips" + (chipSelected === 10 && " bet__selected")}
          onClick={() => selectChip(10)}
        >
          <img className="bet__image" src={chip10} alt="10 chip" />
        </div>
        <div
          className={"bet__chips" + (chipSelected === 5 && " bet__selected")}
          onClick={() => selectChip(5)}
        >
          <img className="bet__image" src={chip5} alt="5 chip" />
        </div>
        <div
          className={"bet__chips" + (chipSelected === 1 && " bet__selected")}
          onClick={() => selectChip(1)}
        >
          <img className="bet__image" src={chip1} alt="1 chip" />
        </div>
      </div>
      <button className="button" onClick={() => clearBets()}>
        Clear bets
      </button>
      <button className="button" onClick={() => spinWheel()}>
        Spin
      </button>
    </div>
  );
};

Options.propTypes = {
  chipSelected: PropTypes.number,
  selectChip: PropTypes.func.isRequired,
  clearBets: PropTypes.func.isRequired,
  spinWheel: PropTypes.func.isRequired
};

export default Options;
