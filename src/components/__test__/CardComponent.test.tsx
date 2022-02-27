import { screen } from '@testing-library/react';
import React from 'react';
import { render } from '../../test-utils';
import CardComponent from '../CardComponent';

describe('CardComponent test', () => {
	test('Card component with provided title', () => {
		render(
			<CardComponent title="Card Title">
				<div>Card Body</div>
			</CardComponent>
		);

		expect(screen.getByText('Card Title', { selector: 'h5' })).toBeInTheDocument();
		expect(screen.getByText('Card Body', { selector: 'div' })).toBeInTheDocument();
	});
});
