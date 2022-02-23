import { combineReducers } from 'redux';
import attendanceReducer from './attendanceReducer';
import currentScheduleReducer from './currentScheduleReducer';

const scheduleReducer = combineReducers({
	attendance: attendanceReducer,
	currentSchedule: currentScheduleReducer,
});

export default scheduleReducer;

export type RootState = ReturnType<typeof scheduleReducer>;
