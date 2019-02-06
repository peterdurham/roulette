import React from "react";
import PropTypes from "prop-types";

const Stats = ({
  lastSpin,
  lastResult,
  playerAmount,
  currentTotalBet,
  lastWinMessages
}) => {
  let red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  let black = [
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

  let redBack =
    red.indexOf(lastSpin) > -1 ? (
      <div className="red spin-result">{lastSpin}</div>
    ) : null;

  let blackBack =
    black.indexOf(lastSpin) > -1 ? (
      <div className="black spin-result">{lastSpin}</div>
    ) : null;

  let greenBack =
    lastSpin === 0 ? <div className="green spin-result">{lastSpin}</div> : null;

  let spin;
  if (lastResult === 0) {
    spin = <div className="result__black">${lastResult}</div>;
  } else if (lastResult > 0) {
    spin = <div className="result__green">${lastResult}</div>;
  } else if (lastResult < 0) {
    spin = <div className="result__red">${lastResult}</div>;
  }

  return (
    <div className="stats__panel">
      <div className="stats__display">
        <p>
          <span className="stats__label stats__label--player">Player:</span>{" "}
          <span className="stats__result--amount">${playerAmount}</span>
        </p>
        <p>
          <span className="stats__label">Current Bet:</span>{" "}
          <span className="stats__result--amount">${currentTotalBet}</span>
        </p>
      </div>
      <div className="stats__spin">
        <div className="stats__spin--label">
          <span className="stats__result--label">Last Spin</span>{" "}
          <div className="stats__amount--label">{spin}</div>
        </div>
        <div className="stats__result--display">
          {redBack}
          {blackBack}
          {greenBack}
        </div>
      </div>
      <div className="stats__result">
        <p className="stats__result--label">Results:</p>
        {lastWinMessages.map((message, index) => (
          <p className="stats__result--message" key={index}>
            {message}
          </p>
        ))}
      </div>
    </div>
  );
};
Stats.propTypes = {
  lastSpin: PropTypes.number,
  lastResult: PropTypes.number,
  playerAmount: PropTypes.number.isRequired,
  currentTotalBet: PropTypes.number.isRequired,
  lastWinMessages: PropTypes.array.isRequired
};
export default Stats;
