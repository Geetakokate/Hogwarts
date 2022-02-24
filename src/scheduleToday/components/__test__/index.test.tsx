import React from 'react';
import { screen } from '@testing-library/react';
import ScheduleToday from '..';
import { render } from '../../../test-utils';

describe('ScheduleToday Component', () => {
	test('renders schedule todays', () => {
		render(<ScheduleToday />);
		expect(screen.getByText('Schedule Today')).toBeInTheDocument();
	});
});
