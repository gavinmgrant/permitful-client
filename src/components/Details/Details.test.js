import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Details from './Details';

describe(`Details component`, () => {

    it('renders a `.details`', () => {
        const wrapper = shallow(<Details statusDate='2011-08-25T00:00:00.000' />);
        expect(toJson(wrapper)).toMatchSnapshot()
    });
});