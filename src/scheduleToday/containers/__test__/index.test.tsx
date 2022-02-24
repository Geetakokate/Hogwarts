import React from 'react';
import ScheduleTodayContainer from '..';
import { render } from '../../../test-utils';

describe('SceduleToday Container test', () => {
	it('should render scheduleToday component', () => {
		render(<ScheduleTodayContainer />);
	});
});
