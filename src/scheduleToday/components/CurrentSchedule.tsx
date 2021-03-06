import React from 'react';
import PropTypes from 'prop-types';
import { studentObject, studentsSubjectObject, teacherObject } from './types';
import { ABSENT, ALL_SUBJECT, HIGHEST_PRIORITY, PRESENT } from '../constants';
import CardComponent from '../../components/CardComponent';
import TableComponent from '../../components/TableComponent';

type Props = {
	studentsList: Array<studentObject>;
	teachersList: Array<teacherObject>;
};

const CurrentSchedule = ({ studentsList, teachersList }: Props) => {
	const tableConfig = {
		className: 'current-schedule-table',
	};

	// Get present headMaster / headMistress
	// if both present then get first in priority queue.
	// else one of them is preset then return present one.
	const getPresentHeadTeacher = () => {
		const higherPriorityTeachers = teachersList.filter(
			teacher => teacher.subject === ALL_SUBJECT && teacher.attendance === PRESENT
		);
		if (higherPriorityTeachers.length > 1) {
			return higherPriorityTeachers.filter(
				teacher => teacher.priority > HIGHEST_PRIORITY[ALL_SUBJECT]
			)[0]?.name;
		}

		return higherPriorityTeachers[0]?.name;
	};

	const accessPresentTeacher = (subject: string, teachersObj: teacherObject) => {
		// Check if max priority teacher
		if (teachersObj.priority === HIGHEST_PRIORITY[subject]) {
			return getPresentHeadTeacher();
		} else {
			// if not max priority
			// get higher priority teacher in hierarchy
			return (
				teachersList.filter(
					teacher =>
						teacher.priority === teachersObj.priority - 1 &&
						teacher.attendance === PRESENT &&
						teacher.subject === subject
				)[0]?.name || getPresentHeadTeacher()
			);
		}
	};

	const getAssignedTeacher = (subject: studentsSubjectObject) => {
		let assignedTeacher = subject.assignedTeacher;
		const teacherObj = teachersList.filter(teacher => teacher.name === assignedTeacher)[0];

		if (!assignedTeacher) {
			// Get highest priority teacher for specific subject
			const highestPriorityTeacher = teachersList.filter(
				teacher =>
					teacher.subject === subject.name &&
					teacher.priority === HIGHEST_PRIORITY[subject.name] &&
					teacher.attendance === PRESENT
			)[0];

			if (highestPriorityTeacher) {
				assignedTeacher = highestPriorityTeacher.name;
			} else {
				// if highest priority teacher is absent
				assignedTeacher = getPresentHeadTeacher();
			}
		}

		// Get present Teacher if allocated teacher is absent
		if (assignedTeacher && teacherObj && teacherObj.attendance === ABSENT) {
			assignedTeacher = accessPresentTeacher(subject.name, teacherObj);
		}

		return assignedTeacher;
	};

	return (
		<CardComponent title="Current Schedule">
			<TableComponent headers={['Student', 'Subject', 'Teacher']} config={tableConfig}>
				<>
					{studentsList.map((student: studentObject) =>
						student.subjects.map((subject: studentsSubjectObject, index: number) => (
							<tr key={`student-${student.id}-${index}`}>
								{index === 0 ? (
									<td rowSpan={student.subjects.length}>{student.name}</td>
								) : null}
								<td
									key={`subject-${subject.name}-${subject.id}`}
									className="word-wrap">
									{subject.name}
								</td>
								<td
									id={`subject-${subject.assignedTeacher}-${subject.id}`}
									key={`subject-${subject.assignedTeacher}-${subject.id}`}>
									{getAssignedTeacher(subject) || 'Not Assigned'}
								</td>
							</tr>
						))
					)}
				</>
			</TableComponent>
		</CardComponent>
	);
};

export default CurrentSchedule;

CurrentSchedule.propTypes = {
	studentsList: PropTypes.array.isRequired,
};
