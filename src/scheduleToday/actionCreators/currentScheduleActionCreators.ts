import { STUDENTS_LIST } from '../api/studentsApi';
import { STUDENTS } from '../constants';

export const getCurrentSchedule = () => {
	const students = JSON.parse(localStorage.getItem(STUDENTS) || '[]');

	return (dispatch: any) => {
		dispatch({
			type: 'LIST_CURRENT_SCHEDULE_SUCCESS',
			payload: students.length > 1 ? students : STUDENTS_LIST,
		});
	};
};
