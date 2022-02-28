import React from 'react';
import TestRenderer from 'react-test-renderer';
import { defineFeature, loadFeature } from 'jest-cucumber';
import TeachersList from '../../components/TeachersList';

const feature = loadFeature('./src/scheduleToday/features/teachers-list.feature');
const TEACHERS = [
	{
		id: 1,
		name: 'Professor Dumbledore',
		attendance: 'Present',
		subject: 'All',
		priority: 1,
	},
	{
		id: 2,
		name: 'Minerva McGonagall',
		attendance: 'Present',
		subject: 'All',
		priority: 2,
	},
];

const onAttendanceChange = jest.fn();

defineFeature(feature, test => {
	test('Changing teachers attendance', ({ given, when, then }) => {
		let testInstance: TestRenderer.ReactTestInstance;
		given('teachers list currently look like', () => {
			const testRenderer = TestRenderer.create(
				<TeachersList teachersList={TEACHERS} onAttendanceChange={onAttendanceChange} />
			);
			testInstance = testRenderer.root;
		});

		when('change one of teachers attendance to absent', () => {
			testInstance.findByProps({ id: 'attendance-1-1' }).props.onClick();
		});

		then('should update in table', () => {
			expect(onAttendanceChange).toBeCalled();
		});
	});
});
