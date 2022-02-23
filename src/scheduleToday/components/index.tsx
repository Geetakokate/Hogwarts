import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
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
		<Card className="m-2">
			<CardTitle tag="h5" className="m-2">
				Schedule Today
			</CardTitle>
			<CardBody>
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
			</CardBody>
		</Card>
	);
};

export default ScheduleToday;
