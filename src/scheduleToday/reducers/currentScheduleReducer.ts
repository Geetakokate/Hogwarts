import {
	LIST_CURRENT_SCHEDULE_SUCCESS,
} from '../actions/currentScheduleActions';

const initialState = {
	studentsList: [],
};

export default function currentScheduleReducer(state = initialState, action: any) {
	switch (action.type) {
		case LIST_CURRENT_SCHEDULE_SUCCESS:
			return {
				...state,
				studentsList: action.payload,
			};
		default:
			return {
				...state,
			};
	}
}


