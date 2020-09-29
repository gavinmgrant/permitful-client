import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PermitMap from './PermitMap';

describe(`PermitMap component`, () => {
    it('renders a permit map by default', () => {
      const wrapper = shallow(<PermitMap />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
});