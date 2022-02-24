import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import { RootState } from '../reducers';
import {
	getTeachersList,
	updateTeacherAttendance,
} from '../actionCreators/attendanceActionCreators';
import { getCurrentSchedule } from '../actionCreators/currentScheduleActionCreators';
import CurrentSchedule from './CurrentSchedule';
import TeachersList from './TeachersList';

const ScheduleToday = () => {
	const teachersList = useSelector((state: RootState) => state.attendance?.teachersList),
		studentsList = useSelector((state: RootState) => state.currentSchedule?.studentsList),
		dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTeachersList());
		dispatch(getCurrentSchedule());
	}, [dispatch]);

	const onAttendanceChange = (selected: any, teacher: any) => {
		teacher.attendance = selected.value;
		dispatch(updateTeacherAttendance(teacher));
		dispatch(getTeachersList());
		dispatch(getCurrentSchedule());
	};

	return (
		<div className="schedule-page-wrapper">
			<h4 className="m-4">Schedule Today</h4>
			<Container>
				<Row>
					<Col>
						<TeachersList
							teachersList={teachersList}
							onAttendanceChange={onAttendanceChange}
						/>
					</Col>
					<Col>
						<CurrentSchedule studentsList={studentsList} teachersList={teachersList} />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default ScheduleToday;
