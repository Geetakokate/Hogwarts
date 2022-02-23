import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getTeachersList, updateTeacherAttendance } from '../attendanceActionCreators';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
	teachersList: [],
};

const store = mockStore(initialState);

describe('Attendance Action Creator test', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('Should dispatch LIST_TEACHERS_ATTENDANCE action', () => {
		store.dispatch(getTeachersList() as any);
		const actions = store.getActions();
		const expectedPayload = {
			type: 'LIST_TEACHER_ATTENDANCE_SUCCESS',
			payload: [],
		};

		expect(actions).toEqual([expectedPayload]);
	});

	it('Should dispatch UPDATE_TEACHER_ATTENDANCE action', () => {
		store.dispatch(updateTeacherAttendance({}) as any);
		const actions = store.getActions();
		const expectedPayload = {
			type: 'UPDATE_TEACHER_ATTENDANCE_SUCCESS',
			payload: [],
		};

		expect(actions[1]).toEqual(expectedPayload);
	});
});
