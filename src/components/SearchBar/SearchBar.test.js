import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchBar from './SearchBar';

describe(`SearchBar component`, () => {
    it('renders a search bar form by default', () => {
      const wrapper = shallow(<SearchBar />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
});