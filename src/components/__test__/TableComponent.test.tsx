import { screen } from '@testing-library/react';
import React from 'react';
import { render } from '../../test-utils';
import TableComponent from '../TableComponent';

describe('TableComponent test', () => {
	test('Table component with provided title', () => {
		render(
			<TableComponent headers={['header1', 'header2']} config={{ className: '' }}>
				<tr>
					<td>Table Body</td>
				</tr>
			</TableComponent>
		);

		expect(screen.getByText('header1', { selector: 'th' })).toBeInTheDocument();
		expect(screen.getByText('header2', { selector: 'th' })).toBeInTheDocument();
		expect(screen.getByText('Table Body', { selector: 'td' })).toBeInTheDocument();
	});
});
