import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Footer from './Footer';

describe(`Footer component`, () => {
    it('renders a footer by default', () => {
      const wrapper = shallow(<Footer />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
});