import { LIST_TEACHER_ATTENDANCE_SUCCESS, UPDATE_TEACHER_ATTENDANCE_SUCCESS } from '../actions/attendanceActions';
import { TEACHERS } from '../constants';

export const getTeachersList = () => {
	const teachers = JSON.parse(localStorage.getItem(TEACHERS) || "[]");

	return (dispatch: any) => {
		dispatch({
			type: LIST_TEACHER_ATTENDANCE_SUCCESS,
			payload: teachers,
		});
	};
};

export const updateTeacherAttendance = (updatedTeacher: any) => {
	const teachers = JSON.parse(localStorage.getItem(TEACHERS) || "[]");
	teachers.filter((teacher: any) => {
		if(teacher.id === updatedTeacher.id){
			teacher.attendance = updatedTeacher.attendance
		}
	});

	localStorage.setItem(TEACHERS, JSON.stringify(teachers));

	return (dispatch: any) => {
		dispatch({
			type: UPDATE_TEACHER_ATTENDANCE_SUCCESS,
			payload: teachers
		})
	}
};
