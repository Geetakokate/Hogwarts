import {
	LIST_TEACHER_ATTENDANCE_SUCCESS,
	UPDATE_TEACHER_ATTENDANCE_SUCCESS,
} from '../actions/attendanceActions';

const initialState = {
	teachersList: [],
};

export default function attendanceReducer(state = initialState, action: any) {
	switch (action.type) {
		case LIST_TEACHER_ATTENDANCE_SUCCESS:
			return {
				...state,
				teachersList: action.payload,
			};
		case UPDATE_TEACHER_ATTENDANCE_SUCCESS:
			return {
				...state,
				teachersList: action.payload,
			};
		default:
			return { ...state };
	}
}
