import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import scheduleReducer from './scheduleToday/reducers';

function render(
	ui: any,
	{
		preloadedState,
		store = configureStore({ reducer: scheduleReducer, preloadedState }),
		...renderOptions
	}: any = {}
) {
	function Wrapper({ children }: any) {
		return <Provider store={store}>{children}</Provider>;
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
