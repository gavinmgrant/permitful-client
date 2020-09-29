import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavBar from './NavBar';

describe(`NavBar component`, () => {
    it('renders a navbar by default', () => {
      const wrapper = shallow(<NavBar />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
});