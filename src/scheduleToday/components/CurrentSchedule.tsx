import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import { ABSENT, ALL_SUBJECT, HIGHEST_PRIORITY, PRESENT } from '../constants';

type Props = {
	studentsList: Array<any>;
	teachersList: Array<any>;
};

const CurrentSchedule = ({ studentsList, teachersList }: Props) => {
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

	const accessPresetTeacher = (subject: string, teachersObj: any) => {
		// Check if max priority teacher
		if (teachersObj.priority === HIGHEST_PRIORITY[subject]) {
			return getPresentHeadTeacher();
		} else {
			// if not max priority
			// get higher priority teacher in hierarchy
			teachersList.filter(teacher => {
				if (
					teacher.priority === teachersObj.priority - 1 &&
					teacher.attendance === PRESENT
				) {
					return teacher.name;
				} else if (teacher.attendance === ABSENT) {
					accessPresetTeacher(subject, teacher);
				}
			});
		}
	};

	const getAssignedTeacher = (subject: any) => {
		let assignedTeacher = subject.assignedTeacher;
		const teacherObj = teachersList.filter(teacher => teacher.name === assignedTeacher)[0];

		if (!assignedTeacher) {
			// Get highest priority teacher for specific subject
			assignedTeacher = teachersList.filter(
				teacher =>
					teacher.subject === subject.name &&
					teacher.priority === HIGHEST_PRIORITY[subject.name] &&
					teacher.attendance === PRESENT
			)[0];

			if (assignedTeacher) {
				assignedTeacher = assignedTeacher.name;
			} else {
				// if highest priority teacher is absent
				assignedTeacher = getPresentHeadTeacher();
			}
		}

		// Get present Teacher if allocated teacher is absent
		if (assignedTeacher && teacherObj && teacherObj.attendance === ABSENT) {
			assignedTeacher = accessPresetTeacher(subject.name, teacherObj);
		}

		return assignedTeacher;
	};

	return (
		<Card className="scroll">
			<CardTitle tag="h6" className="m-2">
				Current Schedule
			</CardTitle>
			<CardBody>
				<Table className="current-schedule-table">
					<thead>
						<tr>
							<th>Student</th>
							<th>Subject</th>
							<th>Teacher</th>
						</tr>
					</thead>
					<tbody>
						{studentsList.map((student: any) =>
							student.subjects.map((subject: any, index: number) => {
								return (
									<tr key={`student-${student.id}-${index}`}>
										{index === 0 ? (
											<td rowSpan={student.subjects.length}>
												{student.name}
											</td>
										) : null}
										<td
											key={`subject-${subject.name}-${subject.id}`}
											className="word-wrap">
											{subject.name}
										</td>
										<td
											key={`subject-${subject.assignedTeacher}-${subject.id}`}>
											{getAssignedTeacher(subject) || 'Not Assigned'}
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</Table>
			</CardBody>
		</Card>
	);
};

export default CurrentSchedule;

CurrentSchedule.propTypes = {
	studentsList: PropTypes.array.isRequired,
};
