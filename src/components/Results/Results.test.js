import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Results from './Results';

describe(`Results component`, () => {
    it('renders a results form by default', () => {
      const wrapper = shallow(<Results searchAddress='2000 Post Street, San Francisco, CA'/>)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
});