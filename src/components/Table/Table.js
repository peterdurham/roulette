import React from 'react';

import Slot from '../Slot/Slot';

const Table = ({ betMap, betSelected, selectBetHandler }) => {
    let topRow = [3,6,9,12,15,18,21,24,27,30,33,36, "3rd row"];
      let topRowBets = topRow.map((item)=> {
        let current = null;
        betMap.forEach((bet)=>{
          if(bet.value === item){
            current = bet.currentBet;
          }
        })
        return current;
      })
  
      let middleRow = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, '2nd row'];
      let middleRowBets = middleRow.map((item)=> {
        let current = null;
        betMap.forEach((bet)=>{
          if(bet.value === item){
            current = bet.currentBet;
          }
        })
        return current;
      })
  
      let bottomRow = [1,4,7, 10, 13, 16, 19, 22, 25, 28, 31, 34, '1st row'];
      let bottomRowBets = bottomRow.map((item)=> {
        let current = null;
        betMap.forEach((bet)=>{
          if(bet.value === item){
            current = bet.currentBet;
          }
        })
        return current;
      })
  
      let sideLineTop = ['1st 12', '2nd 12', '3rd 12'];
      let sideLineTopBets = sideLineTop.map((item)=> {
        let current = null;
        betMap.forEach((bet)=>{
          if(bet.value === item){
            current = bet.currentBet;
          }
        })
        return current;
      })
  
      let sideLineBot = ['1-18', 'EVEN', 'Red', 'Black', 'ODD', '19-36'];
      let sideLineBotBets = sideLineBot.map((item)=> {
        let current = null;
        betMap.forEach((bet)=>{
          if(bet.value === item){
            current = bet.currentBet;
          }
        })
        return current;
      })
  
      let zeroLine = [0];
      let zeroLineBets = zeroLine.map((item)=> {
        let current = null;
        betMap.forEach((bet)=>{
          if(bet.value === item){
            current = bet.currentBet;
          }
        })
        return current;
      })
    
   
    return(
      <div>
        <div className="board">
            
  
            <div>
              <Slot 
                betValue={0}
                betSelected = {betSelected}
                selectBetHandler = {selectBetHandler}
                betAmount = {zeroLineBets[0]}
              />
            </div>
            <div className="topthree__rows">
              <div className="top-row">
                  {topRow.map((bet, index)=><Slot 
                    key={bet}
                    betValue = {bet}
                    betSelected = {betSelected}
                    selectBetHandler = {selectBetHandler}
                    betAmount= {topRowBets[index]}
                  />)}
                </div>
                <div className="middle-row">
                  {middleRow.map((bet, index)=><Slot 
                    key={bet}
                    betValue = {bet}
                    betSelected = {betSelected}
                    selectBetHandler = {selectBetHandler}
                    betAmount= {middleRowBets[index]}
                  />)}
                </div>
                <div className="bottom-row">
                  {bottomRow.map((bet, index)=><Slot 
                    key={bet}
                    betValue = {bet}
                    betSelected = {betSelected}
                    selectBetHandler = {selectBetHandler}
                    betAmount= {bottomRowBets[index]}
                  />)}
                </div>
            </div>
                
                <div className="side-line-1">
                  {sideLineTop.map((bet, index)=><Slot 
                    key={bet}
                    betValue = {bet}
                    betSelected = {betSelected}
                    selectBetHandler = {selectBetHandler}
                    betAmount= {sideLineTopBets[index]}
                  />)}
                </div>
                <div className="side-line-2">
                {sideLineBot.map((bet, index)=><Slot 
                    key={bet}
                    betValue = {bet}
                    betSelected = {betSelected}
                    selectBetHandler = {selectBetHandler}
                    betAmount= {sideLineBotBets[index]}
                  />)}
                </div>
              </div>
      </div>
    );
  }

  export default Table;