import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getCurrentSchedule } from '../currentScheduleActionCreators';

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

	it('Should dispatch LIST_CURRENT_SCHEDULE action', () => {
		store.dispatch(getCurrentSchedule() as any);
		const actions = store.getActions();
		const expectedPayload = {
			type: 'LIST_CURRENT_SCHEDULE_SUCCESS',
			payload: [],
		};

		expect(actions).toEqual([expectedPayload]);
	});
});
