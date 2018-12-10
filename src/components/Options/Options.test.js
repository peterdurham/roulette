import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Options from './Options';

afterEach(cleanup);

test('<Options />', () => {
    const { debug, getByTestId } = render(<Options />);

    expect(getByTestId('clear-button').tagName).toBe('BUTTON');
    expect(getByTestId('clear-button').textContent).toBe('Clear bets');

    expect(getByTestId('spin-button').tagName).toBe('BUTTON');
    expect(getByTestId('spin-button').textContent).toBe('Spin');

    expect(getByTestId('bet-100').tagName).toBe('DIV');


    expect(Options.find('img').filterWhere((item) => {
        return item.prop('src') === chip100;
      })).to.have.lengthOf(1);

})