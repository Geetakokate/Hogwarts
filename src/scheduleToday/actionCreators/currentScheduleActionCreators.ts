import { STUDENTS } from '../constants';

export const getCurrentSchedule = () => {
	const students = JSON.parse(localStorage.getItem(STUDENTS) || '[]');

	return (dispatch: any) => {
		dispatch({
			type: 'LIST_CURRENT_SCHEDULE_SUCCESS',
			payload: students,
		});
	};
};
