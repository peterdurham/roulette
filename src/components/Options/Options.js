import React from 'react';

import chip1 from '../../img/chip1background.jpg';
import chip5 from '../../img/chip5background.jpg';
import chip10 from '../../img/chip10background.jpg';
import chip25 from '../../img/chip25background.jpg';
import chip100 from '../../img/chip100background.jpg';


const Options = (props) => {
    return (
        <div>
            <div className="bet__options">
              <div className="bet__options--label">Select bet: </div>
              <div data-testid="bet-100" className={props.chipSelected===100 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>props.selectChip(100)}><img className="bet__image" src={chip100} alt="100 chip"/></div>
              <div data-testid="bet-25" className={props.chipSelected===25 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>props.selectChip(25)}><img className="bet__image" src={chip25} alt="25 chip"/></div>
              <div data-testid="bet-10" className={props.chipSelected===10 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>props.selectChip(10)}><img className="bet__image" src={chip10} alt="10 chip"/></div>
              <div data-testid="bet-5" className={props.chipSelected===5 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>props.selectChip(5)}><img className="bet__image" src={chip5} alt="5 chip"/></div>
              <div data-testid="bet-1" className={props.chipSelected===1 ? "bet__chips bet__selected" : "bet__chips"} onClick={()=>props.selectChip(1)}><img className="bet__image" src={chip1} alt="1 chip"/></div>
            </div>
            <button data-testid="clear-button" className="button" onClick={()=>props.clearBets()}>Clear bets</button>
            <button data-testid="spin-button" className="button" onClick={()=>props.spinWheel()}>Spin</button>
        </div>
    );
}

export default Options;