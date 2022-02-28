import React from 'react';
import TestRenderer from 'react-test-renderer';
import { defineFeature, loadFeature } from 'jest-cucumber';
import CurrentSchedule from '../../components/CurrentSchedule';
import { ABSENT, HIGHEST_PRIORITY, PRESENT } from '../../constants';

const feature = loadFeature('./src/scheduleToday/features/current-schedule.feature');

const STUDENTS = [
	{
		id: 1,
		name: 'Harry Potter',
		subjects: [
			{
				id: 1,
				name: 'Potions Master',
				assignedTeacher: 'Horace Slughorn',
			},
		],
	},
];

const TEACHERS = [
	{
		id: 1,
		name: 'Professor Dumbledore',
		designation: 'Headmaster',
		subject: 'All',
		attendance: 'Absent',
		priority: 1,
	},
	{
		id: 2,
		name: 'Minerva McGonagall',
		designation: 'Headmistress',
		subject: 'All',
		attendance: 'Present',
		priority: 2,
	},
	{
		id: 3,
		name: 'Rubeus Hagrid',
		designation: 'Standby Professor',
		subject: 'Potions Master',
		attendance: 'Present',
		priority: 3,
	},
	{
		id: 4,
		name: 'Horace Slughorn',
		designation: 'Professor',
		subject: 'Potions Master',
		attendance: 'Present',
		priority: 4,
	},
];

defineFeature(feature, test => {
	let testInstance: TestRenderer.ReactTestInstance;

	test('Horace Slughorn is allocated to Harry Potter for Potions Master', ({
		given,
		when,
		and,
		then,
	}) => {
		given('Harry Potter is studying from Horace Slughorn', () => {
			const testRenderer = TestRenderer.create(
				<CurrentSchedule studentsList={STUDENTS} teachersList={TEACHERS} />
			);
			testInstance = testRenderer.root;
		});

		when('Horace Slughorn is allocated to Harry Potter', () => {
			expect(STUDENTS[0].subjects[0].assignedTeacher).toBe('Horace Slughorn');
		});

		and('Horace is Present', () => {
			expect(TEACHERS[3].attendance).toBe(PRESENT);
		});

		then('Harry is assigned to Horace', () => {
			const tdInstance = testInstance.findAllByType('td');
			expect(tdInstance[0].props.children).toBe('Harry Potter');
			expect(tdInstance[1].props.children).toBe('Potions Master');
			expect(tdInstance[2].props.children).toBe('Horace Slughorn');
		});
	});

	test('No teacher is allocated to Harry Potter for Potions Master', ({
		given,
		when,
		and,
		then,
	}) => {
		given('Harry is studying from Rubeus Hagrid', () => {
			STUDENTS[0].subjects[0].assignedTeacher = '';
			const testRenderer = TestRenderer.create(
				<CurrentSchedule studentsList={STUDENTS} teachersList={TEACHERS} />
			);
			testInstance = testRenderer.root;
		});

		when('Rubeus is higher up in priority', () => {
			expect(TEACHERS[2].priority).toBe(HIGHEST_PRIORITY['Potions Master']);
		});

		and('Rubeus is present', () => {
			expect(TEACHERS[2].attendance).toBe(PRESENT);
		});

		then('Harry is assigned to Rubeus', () => {
			const tdInstance = testInstance.findAllByType('td');
			expect(tdInstance[0].props.children).toBe('Harry Potter');
			expect(tdInstance[1].props.children).toBe('Potions Master');
			expect(tdInstance[2].props.children).toBe('Rubeus Hagrid');
		});
	});

	test('Horace Slughorn is allocated to Harry Potter but he is absent', ({
		given,
		when,
		and,
		then,
	}) => {
		given('Harry is studying from Rubeus Hagrid', () => {
			STUDENTS[0].subjects[0].assignedTeacher = 'Horace Slughorn';
			TEACHERS[3].attendance = ABSENT;
			// const testRenderer = TestRenderer.create(
			// 	<CurrentSchedule studentsList={STUDENTS} teachersList={TEACHERS} />
			// );
			// testInstance = testRenderer.root;
		});

		when('Horace is absent', () => {
			expect(TEACHERS[3].attendance).toBe(ABSENT);
		});

		and('Rubeus is higher up in priority', () => {
			expect(TEACHERS[2].priority).toBe(HIGHEST_PRIORITY['Potions Master']);
		});

		and('Rubeus is present', () => {
			expect(TEACHERS[2].attendance).toBe(PRESENT);
		});

		then('Harry is assigned to Rubeus', () => {
			const tdInstance = testInstance.findAllByType('td');
			expect(tdInstance[0].props.children).toBe('Harry Potter');
			expect(tdInstance[1].props.children).toBe('Potions Master');
			expect(tdInstance[2].props.children).toBe('Rubeus Hagrid');
		});
	});

	test('Horace Slughorn is allocated to Harry Potter for Potions Master. But Horace and standby teacher is absent', ({
		given,
		when,
		and,
		then,
	}) => {
		given('Harry is studying from Minerva McGonagall', () => {
			STUDENTS[0].subjects[0].assignedTeacher = 'Horace Slughorn';
			TEACHERS[3].attendance = ABSENT;
			TEACHERS[2].attendance = ABSENT;
			const testRenderer = TestRenderer.create(
				<CurrentSchedule studentsList={STUDENTS} teachersList={TEACHERS} />
			);
			testInstance = testRenderer.root;
		});

		when('Horace is absent', () => {
			TEACHERS[3].attendance = ABSENT;
		});

		and('standby teacher is absent', () => {
			TEACHERS[2].attendance = ABSENT;
		});

		and('Minerva is present', () => {
			TEACHERS[1].attendance = PRESENT;
		});

		then('Harry is assigned to Minerva', () => {
			const tdInstance = testInstance.findAllByType('td');
			expect(tdInstance[0].props.children).toBe('Harry Potter');
			expect(tdInstance[1].props.children).toBe('Potions Master');
			expect(tdInstance[2].props.children).toBe('Minerva McGonagall');
		});
	});

	test('Horace Slughorn is allocated to Harry Potter. He was absent but he is present now', ({
		given,
		when,
		then,
	}) => {
		given('Harry is studying from Horace', () => {
			STUDENTS[0].subjects[0].assignedTeacher = 'Horace Slughorn';
			expect(TEACHERS[3].attendance).toBe(ABSENT);
			TEACHERS[3].attendance = PRESENT;
			const testRenderer = TestRenderer.create(
				<CurrentSchedule studentsList={STUDENTS} teachersList={TEACHERS} />
			);
			testInstance = testRenderer.root;
		});

		when('Horace was absent and changed attendance to present', () => {
			expect(TEACHERS[3].attendance).toBe(PRESENT);
		});

		then('Harry is assigned to Horace Slughorn', () => {
			const tdInstance = testInstance.findAllByType('td');
			expect(tdInstance[0].props.children).toBe('Harry Potter');
			expect(tdInstance[1].props.children).toBe('Potions Master');
			expect(tdInstance[2].props.children).toBe('Horace Slughorn');
		});
	});
});
