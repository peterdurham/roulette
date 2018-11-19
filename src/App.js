import React, { Component } from 'react';
import './style.scss';

import Stats from './Stats/Stats';
import Table from './Table/Table';
import chip1 from './img/chip1background.jpg';
import chip5 from './img/chip5background.jpg';
import chip10 from './img/chip10background.jpg';
import chip25 from './img/chip25background.jpg';
import chip100 from './img/chip100background.jpg';

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
        
        <h1 className="header">Roulette</h1>
        
        <div className="screen">
          <div className="game">
            <div className="display">
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
            </div>
            
            <div className="bet__options">
              <div className="bet__options--label">Select bet: </div>
              <div className={this.state.chipSelected===100 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>this.selectChipHandler(100)}><img className="bet__image" src={chip100} alt="100 chip"/></div>
              <div className={this.state.chipSelected===25 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>this.selectChipHandler(25)}><img className="bet__image" src={chip25} alt="25 chip"/></div>
              <div className={this.state.chipSelected===10 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>this.selectChipHandler(10)}><img className="bet__image" src={chip10} alt="10 chip"/></div>
              <div className={this.state.chipSelected===5 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>this.selectChipHandler(5)}><img className="bet__image" src={chip5} alt="5 chip"/></div>
              <div className={this.state.chipSelected===1 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>this.selectChipHandler(1)}><img className="bet__image" src={chip1} alt="1 chip"/></div>
            </div>
            <button className="button" onClick={()=>this.clearBetsHandler()}>Clear bets</button>
            <button className="button" onClick={()=>this.spinWheelHandler()}>Spin</button>
          </div>
          <div className="wheel__display">
            <img className="wheel__image" src={Wheel} alt="wheel"/>
            {numbers.map((num)=><ResultBall
              key = {num}
              number = {num}
              lastSpin = {this.state.lastSpin}
              
            />)}
          </div>
          
        </div>
        
      </div>
    ); 
  }
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




export default App;
