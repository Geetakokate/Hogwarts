import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../test-utils';
import TeachersList from '../TeachersList';

describe('Attendance Component', () => {
	test('renders Attendance', () => {
		render(<TeachersList teachersList={[]} onAttendanceChange={jest.fn()} />);
		expect(screen.getByText('Attendance', { selector: 'th' })).toBeInTheDocument();
		expect(screen.getByText('Teacher', { selector: 'th' })).toBeInTheDocument();
		expect(screen.getByText('Attendance', { selector: 'h5' })).toBeInTheDocument();
	});
});
