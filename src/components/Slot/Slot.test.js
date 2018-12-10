import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Slot from './Slot';

afterEach(cleanup);

test('<Slot />', () => {
    const { debug, getByTestId } = render(<Slot />)
})