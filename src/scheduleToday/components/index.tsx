import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import { RootState } from '../reducers';
import { dropdownOptions, teacherObject } from './types';
import {
	getTeachersList,
	updateTeacherAttendance,
} from '../actionCreators/attendanceActionCreators';
import { getCurrentSchedule } from '../actionCreators/currentScheduleActionCreators';
import CurrentSchedule from './CurrentSchedule';
import TeachersList from './TeachersList';
import TeachersHierarchy from './TeachersHierarchy';

const ScheduleToday = () => {
	const teachersList = useSelector((state: RootState) => state.attendance?.teachersList),
		studentsList = useSelector((state: RootState) => state.currentSchedule?.studentsList),
		dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTeachersList());
		dispatch(getCurrentSchedule());
	}, [dispatch]);

	const onAttendanceChange = (selected: dropdownOptions, teacher: teacherObject) => {
		teacher.attendance = selected.value;
		dispatch(updateTeacherAttendance(teacher));
		dispatch(getTeachersList());
		dispatch(getCurrentSchedule());
	};

	return (
		<div className="schedule-page-wrapper">
			<div className="border-bottom m-3">
				<h4 className="m-2">Schedule Today</h4>
			</div>
			<Container>
				<Row className="mb-4">
					<Col sm={6}>
						<TeachersList
							teachersList={teachersList}
							onAttendanceChange={onAttendanceChange}
						/>
					</Col>
					<Col>
						<CurrentSchedule studentsList={studentsList} teachersList={teachersList} />
					</Col>
				</Row>
				<TeachersHierarchy />
			</Container>
		</div>
	);
};

export default ScheduleToday;
