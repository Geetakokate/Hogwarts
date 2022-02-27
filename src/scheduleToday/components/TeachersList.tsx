import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CardComponent from '../../components/CardComponent';
import TableComponent from '../../components/TableComponent';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

const ATTENDANCE = [
	{ value: 'Present', label: 'Present' },
	{ value: 'Absent', label: 'Absent' },
];

type Props = {
	teachersList: Array<any>;
	onAttendanceChange: any;
};

const AttendanceDropDown = ({
	teacher,
	onAttendanceChange,
}: {
	teacher: any;
	onAttendanceChange: any;
}) => {
	const [isDropdownOpen, setDropdownOpenState] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpenState((prevState: any) => !prevState);
	};

	return (
		<Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>
			<DropdownToggle caret>{teacher.attendance}</DropdownToggle>
			<DropdownMenu>
				{ATTENDANCE.map((attendance: any, index: number) => (
					<DropdownItem
						id={`attendance-${teacher.id}-${index}`}
						key={`attendance-${teacher.id}-${index}`}
						onClick={() => onAttendanceChange(attendance, teacher)}>
						{attendance.label}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
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
								<AttendanceDropDown
									teacher={teacher}
									onAttendanceChange={onAttendanceChange}
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
