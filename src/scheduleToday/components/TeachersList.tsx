import React from 'react';
import PropTypes from "prop-types";
import Select from 'react-select';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import Switch from '../../switch';

const ATTENDANCE = [
	{ value: 'Present', label: 'Present' },
	{ value: 'Absent', label: 'Absent' },
];

type Props = {
	teachersList: Array<any>,
	onAttendanceChange: any
}

const TeachersList = ({ teachersList, onAttendanceChange }: Props) => {
	return (
		<Card className="scroll">
			<CardTitle tag="h6" className="m-2">
				Attendance
			</CardTitle>
			<CardBody>
				<Table>
					<thead>
						<tr>
							<th>Teacher</th>
							<th>Attendance</th>
						</tr>
					</thead>
					<tbody>
						{teachersList.map((teacher: any) => (
							<tr key={`teachers-${teacher.id}`}>
								<td>{teacher.name}</td>
								<td>
									{/* <Switch id={`teacher-${teacher.id}`} /> */}
									<Select
										options={ATTENDANCE}
										onChange={selected => onAttendanceChange(selected, teacher)}
										defaultInputValue={teacher.attendance}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</CardBody>
		</Card>
	);
};

export default TeachersList;

TeachersList.propTypes = {
    teachersList: PropTypes.array.isRequired,
    onAttendanceChange: PropTypes.func.isRequired
};

