import React from 'react';

const Stats = (props) => {
    let red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
     let black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
       
     let redBack = (red.indexOf(props.lastSpin)>-1) ?
       <div className="red spin-result">{props.lastSpin}</div> : null 
       
     let blackBack = (black.indexOf(props.lastSpin)>-1) ?
       <div className="black spin-result">{props.lastSpin}</div> : null
  
      let greenBack = (props.lastSpin===0) ?
       <div className="green spin-result">{props.lastSpin}</div> : null
  
      let spin;
      if(props.lastResult === 0){
        spin = (<div className="result__black">${props.lastResult}</div>)
      } else if(props.lastResult > 0){
        spin = (<div className="result__green">${props.lastResult}</div>)
      } else if(props.lastResult < 0 ){
        spin = (<div className="result__red">${props.lastResult}</div>)
      }
      
    return(
        <div className="stats__panel">
          <div className="stats__display">
            <p><span data-testid="player-label" className="stats__label stats__label--player">Player:</span> <span className="stats__result--amount">${props.playerAmount}</span></p>
            <p><span data-testid="stats-label" className="stats__label">Current Bet:</span> <span className="stats__result--amount">${props.currentTotalBet}</span></p>
          </div>
          <div className="stats__spin">
            <div className="stats__spin--label"><span data-testid="lastspin-label" className="stats__result--label">Last Spin</span> <div className="stats__amount--label">{spin}</div></div>
            <div className="stats__result--display">{redBack}{blackBack}{greenBack}</div>
          </div>
          <div className="stats__result">
            <p data-testid="results-label" className="stats__result--label" >Results:</p>
            {props.lastWinMessages.map((message)=><p className="stats__result--message">{message}</p>)}
          </div>
        </div>
      
    );
  }
  
  export default Stats;