import { LIST_CURRENT_SCHEDULE_SUCCESS } from '../../actions/currentScheduleActions';
import currentScheduleReducer from '../currentScheduleReducer';

const initialState = {
	studentsList: [],
};

describe('currentScheduleReducer Test', () => {
	it('returns the initial state', () => {
		expect(currentScheduleReducer(undefined, {})).toEqual(initialState);
	});

	it('returns current schedule', () => {
		expect(
			currentScheduleReducer(initialState, {
				type: LIST_CURRENT_SCHEDULE_SUCCESS,
				payload: [],
			})
		).toEqual({ ...initialState });
	});
});
