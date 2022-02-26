import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CardComponent from '../../components/CardComponent';
import TableComponent from '../../components/TableComponent';

const ATTENDANCE = [
	{ value: 'Present', label: 'Present' },
	{ value: 'Absent', label: 'Absent' },
];

type Props = {
	teachersList: Array<any>;
	onAttendanceChange: any;
};

const TeachersList = ({ teachersList, onAttendanceChange }: Props) => {
	return (
		<CardComponent title="Attendance">
			<TableComponent headers={['Teacher', 'Attendance']} config={{ className: '' }}>
				<>
					{teachersList.map((teacher: any) => (
						<tr key={`teachers-${teacher.id}`}>
							<td>{teacher.name}</td>
							<td>
								{/* <Switch id={`teacher-${teacher.id}`} /> */}
								<Select
									options={ATTENDANCE}
									onChange={selected => onAttendanceChange(selected, teacher)}
									defaultInputValue={teacher.attendance}
									data-testid={`teacher-attendance-${teacher.id}`}
								/>
							</td>
						</tr>
					))}
				</>
			</TableComponent>
		</CardComponent>
	);
};

export default TeachersList;

TeachersList.propTypes = {
	teachersList: PropTypes.array.isRequired,
	onAttendanceChange: PropTypes.func.isRequired,
};
