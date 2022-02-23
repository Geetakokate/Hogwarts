import React, { useEffect } from 'react';
import { STUDENTS_LIST } from '../api/studentsApi';
import { TEACHERS_LIST } from '../api/teachersApi';
import ScheduleToday from '../components';
import { STUDENTS, TEACHERS } from '../constants';

const ScheduleTodayContainer = () => {
	useEffect(() => {
		localStorage.setItem(TEACHERS, JSON.stringify(TEACHERS_LIST));
		localStorage.setItem(STUDENTS, JSON.stringify(STUDENTS_LIST));
	}, []);

	return <ScheduleToday />;
};

export default ScheduleTodayContainer;
