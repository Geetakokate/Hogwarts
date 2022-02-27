import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../test-utils';
import CurrentSchedule from '../CurrentSchedule';

describe('CurrentSchedule Component', () => {
	test('renders Current schedule', () => {
		render(<CurrentSchedule studentsList={[]} teachersList={[]} />);
		expect(screen.getByText('Current Schedule', { selector: 'h5' })).toBeInTheDocument();
		expect(screen.getByText('Student', { selector: 'th' })).toBeInTheDocument();
		expect(screen.getByText('Subject', { selector: 'th' })).toBeInTheDocument();
		expect(screen.getByText('Teacher', { selector: 'th' })).toBeInTheDocument();
	});
});
