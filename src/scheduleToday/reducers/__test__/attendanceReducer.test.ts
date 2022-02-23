import {
	LIST_TEACHER_ATTENDANCE_SUCCESS,
	UPDATE_TEACHER_ATTENDANCE_SUCCESS,
} from '../../actions/attendanceActions';
import attendanceReducer from '../attendanceReducer';

const initialState = {
	teachersList: [],
};

describe('attendanceReducer Test', () => {
	it('returns the initial state', () => {
		expect(attendanceReducer(undefined, {})).toEqual(initialState);
	});

	it('returns teachers list', () => {
		expect(
			attendanceReducer(initialState, { type: LIST_TEACHER_ATTENDANCE_SUCCESS, payload: [] })
		).toEqual({ ...initialState });
	});

	it('Updates teachers list', () => {
		expect(
			attendanceReducer(initialState, {
				type: UPDATE_TEACHER_ATTENDANCE_SUCCESS,
				payload: [{ name: 'Teacher1' }],
			})
		).toEqual({ ...initialState, teachersList: [{ name: 'Teacher1' }] });
	});
});
