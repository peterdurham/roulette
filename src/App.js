import React, { Component } from 'react';
import './App.css';

import chip1 from './img/chip1.jpg';
import chip1green from './img/chip1green.jpg';
import chip1red from './img/chip1red.jpg';
import chip1black from './img/chip1black.jpg';
import chip5 from './img/chip5.jpg';
import chip5red from './img/chip5red.jpg';
import chip5green from './img/chip5green.jpg';
import chip5black from './img/chip5black.jpg';
import chip10 from './img/chip10.jpg';
import chip10red from './img/chip10red.jpg';
import chip10green from './img/chip10green.jpg';
import chip10black from './img/chip10black.jpg';
import chip25 from './img/chip25.jpg';
import chip25red from './img/chip25red.jpg';
import chip25green from './img/chip25green.jpg';
import chip25black from './img/chip25black.jpg';
import chip100 from './img/chip100.jpg';
import chip100red from './img/chip100red.jpg';
import chip100green from './img/chip100green.jpg';
import chip100black from './img/chip100black.jpg';

import Wheel from './img/wheel.jpg';

class App extends Component {

  state = {
    playerAmount: 500,
    betMap: [],
    spinResult: "",
    betResult: "",
    chipSelected: null,
    currentTotalBet: 0,
    lastSpin: null,
    lastResult: null,
    lastWinMessages: []
  }

  selectBetHandler = (bet) => {
      let betMap = Object.assign([], this.state.betMap);
      let chipSelected = this.state.chipSelected;
      let playerAmount = this.state.playerAmount;
      let totalBet = this.state.currentTotalBet;
      let remaining = playerAmount - totalBet;

      betMap.forEach(function(obj){
        if(obj.value === bet && obj.currentBet === null && remaining >= chipSelected){
          if(playerAmount >= chipSelected){
            obj.currentBet = chipSelected;
            totalBet += chipSelected;
          }
        } else if(obj.value === bet && obj.currentBet !== chipSelected){
          totalBet-=obj.currentBet;
          obj.currentBet = null;
          
        } else if(obj.value === bet && obj.currentBet === chipSelected){
          obj.currentBet = null;
          totalBet-= chipSelected;
        }
      })
   
    
    this.setState(()=>({betMap, currentTotalBet: totalBet, playerAmount: playerAmount}));
  }

 

  selectChipHandler = (bet) => {
    let chip;
    if(this.state.chipSelected === null || this.state.chipSelected !==bet){
      chip = bet;
    } else if(this.state.chipSelected === bet){
      chip = null;
    } 
    this.setState(()=>({chipSelected: chip}));
  }

  populateBetsHandler = () => {
    //define arrays for bet label, and object array
    let betMapArray = [];
    let numberBets = [];
    let betMap = [];
    
    //create array of all bet labels
    for(let i = 0; i<=36 ; i++){
      numberBets.push(i);
    }
    let wordBets = ['3rd row', '2nd row', '1st row', '1st 12', '2nd 12', '3rd 12', '1-18', 'EVEN', 'Red', 'Black', 'ODD', '19-36'];
    betMapArray = numberBets.concat(wordBets);
    
    //constructor for bet slot objects, push to array
    function Slot(value, currentBet){
      this.value = value;
      this.currentBet = currentBet;
    }
    for(let i=0; i<betMapArray.length;i++){
        let betInstance = new Slot(betMapArray[i], null);
        betMap.push(betInstance);
    }

    this.setState(()=>({betMap, chipSelected: null}));
  }

  componentDidMount = () => {
    this.populateBetsHandler();
  }

  clearBetsHandler = () => {
    this.setState(()=>({currentTotalBet: 0}));
    this.populateBetsHandler();
  }

  spinWheelHandler = () => {
      let playerAmount = this.state.playerAmount;
      let startingAmount = this.state.playerAmount;
      let totalBet = this.state.currentTotalBet;
      let betMap = this.state.betMap;
      let winnings = 0;
      let winMessages = [];

      let spin = Math.floor(Math.random()*37);
      let activeBets = betMap.filter((slot)=>slot.currentBet);
      
      if(totalBet > playerAmount){
        return console.log('not enough to play');
      } 

      playerAmount-=totalBet;
        
      let topRow = [3,6,9,12,15,18,21,24,27,30,33,36, '3rd row'];
      let middleRow = [2,5,8,11,14,17,20,23,26,29,32,35, '2nd row'];
      let bottomRow = [1,4,7,10,13,16,19,22,25,28,31,34, '1st row'];
      let red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
      let black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
      let even = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
      let odd = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
      let firstHalf = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
      let secondHalf = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
      let firstThird = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      let secondThird = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      let thirdThird = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

      activeBets.forEach((bet)=>{
        
        if(bet.value > 0 && bet.value === spin){
          winnings += (36*bet.currentBet);
          winMessages.push(`You won $${(bet.currentBet)*36} on ${bet.value}`)
        } else if(bet.value === 0 && spin === 0){
          winnings += (36*bet.currentBet);
          winMessages.push(`You won $${(bet.currentBet)*36} on ${bet.value}`);
        } else if(bet.value === '3rd row' && topRow.indexOf(spin)>-1){
          winnings += (3*bet.currentBet);
          winMessages.push(`You won $${(bet.currentBet)*3} on ${bet.value}`);
        } else if(bet.value === '2nd row' && middleRow.indexOf(spin)>-1){
          winnings += (3*bet.currentBet);
          winMessages.push(`You won $${(bet.currentBet)*3} on ${bet.value}`);
        } else if(bet.value === '1st row' && bottomRow.indexOf(spin)>-1){
          winnings += (3*bet.currentBet);
          winMessages.push(`You won $${(bet.currentBet)*3} on ${bet.value}`);
        } else if(bet.value === 'Red' && red.indexOf(spin)>-1){
          winnings += (2*bet.currentBet);
          winMessages.push(`You won $${(bet.currentBet)*2} on ${bet.value}`);
        } else if(bet.value === 'Black' && black.indexOf(spin)>-1){
          winnings += (2*bet.currentBet);
          winMessages.push(`You won $${(bet.currentBet)*2} on ${bet.value}`);
        } else if(bet.value === 'EVEN' && even.indexOf(spin)>-1){
          winnings += (2*bet.currentBet);
          winMessages.push(`You won $${(bet.currentBet)*2} on ${bet.value}`);
        } else if(bet.value === 'ODD' && odd.indexOf(spin)>-1){
          winnings += (2*bet.currentBet);
          winMessages.push(`You won $${(bet.currentBet)*2} on ${bet.value}`);
        } else if(bet.value === "1st 12" && firstThird.indexOf(spin)>-1){
          winnings += (3*(bet.currentBet));
          winMessages.push(`You won $${(bet.currentBet)*3} on ${bet.value}`);
        } else if(bet.value === "2nd 12" && secondThird.indexOf(spin)>-1){
          winnings += (3*(bet.currentBet));
          winMessages.push(`You won $${(bet.currentBet)*3} on ${bet.value}`);
        } else if(bet.value === "3rd 12" && thirdThird.indexOf(spin)>-1){
          winnings += (3*(bet.currentBet));
          winMessages.push(`You won $${(bet.currentBet)*3} on ${bet.value}`);
        } else if(bet.value === '1-18' && firstHalf.indexOf(spin)>-1){
          winnings += (2*bet.currentBet);
          winMessages.push(`You won $${(bet.currentBet)*2} on ${bet.value}`);
        } else if(bet.value === '19-36' && secondHalf.indexOf(spin)>-1){
          winnings += (2*bet.currentBet);
          winMessages.push(`You won $${(bet.currentBet)*2} on ${bet.value}`);
        } 
        
        playerAmount+=winnings;
        let difference = playerAmount-startingAmount;
        winnings = 0;
        

        this.setState(()=>({playerAmount, lastSpin: spin, lastResult: difference, lastWinMessages: winMessages}))
        
        
      });
  }

  render() {
   

   let numbers = [];
   for(let i = 0 ; i <37; i++) {numbers.push(i)};

   

    return (
      <div className="App">
        
        <h1>Roulette App</h1>
        
        <div className="screen">
          <div className="game">
            <Stats
              playerAmount = {this.state.playerAmount}
              currentTotalBet = {this.state.currentTotalBet}
              lastResult = {this.state.lastResult}
              lastWinMessages = {this.state.lastWinMessages}
              lastSpin = {this.state.lastSpin}
            />
            <Table 
              lastSpin = {this.state.lastSpin}
              betSelected = {this.state.betSelected}
              selectBetHandler = {this.selectBetHandler}
              betMap = {this.state.betMap}

            />
            <div className="bet__options">
          
        
              <div className={this.state.chipSelected===100 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>this.selectChipHandler(100)}><img className="bet__image" src={chip100}/></div>
              <div className={this.state.chipSelected===25 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>this.selectChipHandler(25)}><img className="bet__image" src={chip25}/></div>
              <div className={this.state.chipSelected===10 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>this.selectChipHandler(10)}><img className="bet__image" src={chip10}/></div>
              <div className={this.state.chipSelected===5 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>this.selectChipHandler(5)}><img className="bet__image" src={chip5}/></div>
              <div className={this.state.chipSelected===1 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>this.selectChipHandler(1)}><img className="bet__image" src={chip1}/></div>
            </div>
            <button className="button" onClick={()=>this.spinWheelHandler()}>Spin Roulette Wheel</button>
            <button className="button" onClick={()=>this.clearBetsHandler()}>Clear all bets</button>
        
          </div>
          <div className="wheel__display">
            <img className="wheel__image" src={Wheel} />
            {numbers.map((num)=><ResultBall
              number = {num}
              lastSpin = {this.state.lastSpin}
              
            />)}
          </div>
          
        </div>
        
      </div>
    ); 
  }
}

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
      spin = (<span className="result__black">${props.lastResult}</span>)
    } else if(props.lastResult > 0){
      spin = (<span className="result__green">${props.lastResult}</span>)
    } else if(props.lastResult < 0 ){
      spin = (<span className="result__red">${props.lastResult}</span>)
    }
    
  return(
      <div className="stats__panel">
        <div className="stats__display">
          <p>Player: ${props.playerAmount}</p>
          <p>Current Bet: ${props.currentTotalBet}</p>
        </div>
        <div className="stats__spin">
          <p>Last Spin {spin}</p>
          {redBack}{blackBack}{greenBack}
        </div>
        <div className="stats__result">
          <p>Results:</p>
          {props.lastWinMessages.map((message)=><p>{message}</p>)}
        </div>
      </div>
    
  );
}


const Table = (props) => {
  let topRow = [3,6,9,12,15,18,21,24,27,30,33,36, "3rd row"];
    let topRowBets = topRow.map((item)=> {
      let betMap = props.betMap;
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
      let betMap = props.betMap;
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
      let betMap = props.betMap;
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
      let betMap = props.betMap;
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
      let betMap = props.betMap;
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
      let betMap = props.betMap;
      let current = null;
      betMap.forEach((bet)=>{
        if(bet.value === item){
          current = bet.currentBet;
        }
      })
      return current;
    })
    
  
  let red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  let black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
    
  let redBack = (red.indexOf(props.lastSpin)>-1) ?
    <div className="red spin-result">{props.lastSpin}</div> : null 
    
  let blackBack = (black.indexOf(props.lastSpin)>-1) ?
    <div className="black spin-result">{props.lastSpin}</div> : null
  
 
  return(
    <div>
      <div className="board">
          

          <div>
            <Slot 
              betValue={0}
              betSelected = {props.betSelected}
              selectBetHandler = {props.selectBetHandler}
              betAmount = {zeroLineBets[0]}
            />
          </div>
          <div className="topthree__rows">
            <div className="top-row">
                {topRow.map((bet, index)=><Slot 
                  key={bet}
                  betValue = {bet}
                  betSelected = {props.betSelected}
                  selectBetHandler = {props.selectBetHandler}
                  betAmount= {topRowBets[index]}
                />)}
              </div>
              <div className="middle-row">
                {middleRow.map((bet, index)=><Slot 
                  key={bet}
                  betValue = {bet}
                  betSelected = {props.betSelected}
                  selectBetHandler = {props.selectBetHandler}
                  betAmount= {middleRowBets[index]}
                />)}
              </div>
              <div className="bottom-row">
                {bottomRow.map((bet, index)=><Slot 
                  key={bet}
                  betValue = {bet}
                  betSelected = {props.betSelected}
                  selectBetHandler = {props.selectBetHandler}
                  betAmount= {bottomRowBets[index]}
                />)}
              </div>
          </div>
              
              <div className="side-line-1">
                {sideLineTop.map((bet, index)=><Slot 
                  key={bet}
                  betValue = {bet}
                  betSelected = {props.betSelected}
                  selectBetHandler = {props.selectBetHandler}
                  betAmount= {sideLineTopBets[index]}
                />)}
              </div>
              <div className="side-line-2">
              {sideLineBot.map((bet, index)=><Slot 
                  key={bet}
                  betValue = {bet}
                  betSelected = {props.betSelected}
                  selectBetHandler = {props.selectBetHandler}
                  betAmount= {sideLineBotBets[index]}
                />)}
              </div>
            </div>
    </div>
  );
}

const ResultBall = (props) => {
  let classname;
  if(props.lastSpin === props.number){
    classname = `ball ball__${props.number}`;
  }
  
  
  return(
    <div className={classname}>
      
    </div>
  );
}

const Slot = (props)=>{
  const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  const black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
  let greenSmall = ['3rd row', '2nd row', '1st row'];
  let greenMiddle = ['1-18', 'EVEN', 'Red', 'Black', 'ODD', '19-36'];
  let greenLarge = ['1st 12', '2nd 12', '3rd 12'];
  let green = [0, '3rd row', '2nd row', '1st row', '1-18', 'EVEN', 'Red', 'Black', 'ODD', '19-36', '1st 12', '2nd 12', '3rd 12']

  let chip1Display, chip5Display, chip10Display, chip25Display, chip100Display;

  if(green.indexOf(props.betValue)>-1 && props.betAmount === 1){
    chip1Display = (<img className="chip__small" src={chip1green} alt="chip1"/>)
  } else if(red.indexOf(props.betValue)>-1 && props.betAmount === 1){
    chip1Display = (<img className="chip__small" src={chip1red} alt="chip1"/>)
  } else if(black.indexOf(props.betValue)>-1 && props.betAmount === 1){
    chip1Display = (<img className="chip__small" src={chip1black} alt="chip1"/>)
  }

  if(green.indexOf(props.betValue)>-1 && props.betAmount === 5){
    chip5Display = (<img className="chip__small" src={chip5green} alt="chip1"/>)
  } else if(red.indexOf(props.betValue)>-1 && props.betAmount === 5){
    chip5Display = (<img className="chip__small" src={chip5red} alt="chip1"/>)
  } else if(black.indexOf(props.betValue)>-1 && props.betAmount === 5){
    chip5Display = (<img className="chip__small" src={chip5black} alt="chip1"/>)
  }

  if(green.indexOf(props.betValue)>-1 && props.betAmount === 10){
    chip10Display = (<img className="chip__small" src={chip10green} alt="chip1"/>)
  } else if(red.indexOf(props.betValue)>-1 && props.betAmount === 10){
    chip10Display = (<img className="chip__small" src={chip10red} alt="chip1"/>)
  } else if(black.indexOf(props.betValue)>-1 && props.betAmount === 10){
    chip10Display = (<img className="chip__small" src={chip10black} alt="chip1"/>)
  }

  if(green.indexOf(props.betValue)>-1 && props.betAmount === 25){
    chip25Display = (<img className="chip__small" src={chip25green} alt="chip1"/>)
  } else if(red.indexOf(props.betValue)>-1 && props.betAmount === 25){
    chip25Display = (<img className="chip__small" src={chip25red} alt="chip1"/>)
  } else if(black.indexOf(props.betValue)>-1 && props.betAmount === 25){
    chip25Display = (<img className="chip__small" src={chip25black} alt="chip1"/>)
  }

  if(green.indexOf(props.betValue)>-1 && props.betAmount === 100){
    chip100Display = (<img className="chip__small" src={chip100green} alt="chip1"/>)
  } else if(red.indexOf(props.betValue)>-1 && props.betAmount === 100){
    chip100Display = (<img className="chip__small" src={chip100red} alt="chip1"/>)
  } else if(black.indexOf(props.betValue)>-1 && props.betAmount === 100){
    chip100Display = (<img className="chip__small" src={chip100black} alt="chip1"/>)
  }

  let redValue = (red.indexOf(props.betValue)>-1) ?
  <div className={props.betSelected===props.betValue ? "selected board-number red" : "board-number red"} onClick={()=>props.selectBetHandler(props.betValue)}>
  {props.betValue}{chip1Display}{chip5Display}{chip10Display}{chip25Display}{chip100Display}
  </div> : null

  let blackValue = (black.indexOf(props.betValue)>-1) ?
  <div className={props.betSelected===props.betValue ? "selected board-number black" : "board-number black"} onClick={()=>props.selectBetHandler(props.betValue)}>
  {props.betValue}{chip1Display}{chip5Display}{chip10Display}{chip25Display}{chip100Display}
  </div> : null

  let greenSmallValue = (greenSmall.indexOf(props.betValue)>-1) ?
  <div className={props.betSelected===props.betValue ? "selected row-bet" : "row-bet"} onClick={()=>props.selectBetHandler(props.betValue)}>
  {props.betValue}{chip1Display}{chip5Display}{chip10Display}{chip25Display}{chip100Display}
  </div> : null

  let greenMiddleValue = (greenMiddle.indexOf(props.betValue)>-1) ?
  <div className={props.betSelected===props.betValue ? "selected one-of-two-bet" : "one-of-two-bet"} onClick={()=>props.selectBetHandler(props.betValue)}>
  {props.betValue}{chip1Display}{chip5Display}{chip10Display}{chip25Display}{chip100Display}
  </div> : null

  let greenLargeValue = (greenLarge.indexOf(props.betValue)>-1) ?
  <div className={props.betSelected===props.betValue ? "selected thirds-bet" : "thirds-bet"} onClick={()=>props.selectBetHandler(props.betValue)}>
  {props.betValue}{chip1Display}{chip5Display}{chip10Display}{chip25Display}{chip100Display}
  </div> : null

  let zeroBetValue = (props.betValue === 0 || props.betValue === '0') ?
  <div className={props.betSelected===props.betValue ? "selected__zero zero__bet" : "zero__bet"} onClick={()=>props.selectBetHandler(props.betValue)}>
  {props.betValue}{chip1Display}{chip5Display}{chip10Display}{chip25Display}{chip100Display}
  </div> : null


  return(
    <div className="board__chips">
      {redValue}{blackValue}{greenSmallValue}{greenMiddleValue}{greenLargeValue}{zeroBetValue}
      
    </div>
  );
}




export default App;
