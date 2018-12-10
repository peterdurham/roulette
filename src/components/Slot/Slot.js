import React from 'react';

import chip1green from '../../img/chip1green.jpg';
import chip1red from '../../img/chip1red.jpg';
import chip1black from '../../img/chip1black.jpg';

import chip5red from '../../img/chip5red.jpg';
import chip5green from '../../img/chip5green.jpg';
import chip5black from '../../img/chip5black.jpg';

import chip10red from '../../img/chip10red.jpg';
import chip10green from '../../img/chip10green.jpg';
import chip10black from '../../img/chip10black.jpg';

import chip25red from '../../img/chip25red.jpg';
import chip25green from '../../img/chip25green.jpg';
import chip25black from '../../img/chip25black.jpg';

import chip100red from '../../img/chip100red.jpg';
import chip100green from '../../img/chip100green.jpg';
import chip100black from '../../img/chip100black.jpg';


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
    <span className="one-of-two-bet__height">{props.betValue}</span>{chip1Display}{chip5Display}{chip10Display}{chip25Display}{chip100Display}
    </div> : null
  
    let greenLargeValue = (greenLarge.indexOf(props.betValue)>-1) ?
    <div className={props.betSelected===props.betValue ? "selected thirds-bet" : "thirds-bet"} onClick={()=>props.selectBetHandler(props.betValue)}>
    <span className="thirds-bet__height">{props.betValue}</span>{chip1Display}{chip5Display}{chip10Display}{chip25Display}{chip100Display}
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
  

  export default Slot;