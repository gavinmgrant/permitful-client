import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RegistrationForm from './RegistrationForm';

describe(`RegistrationForm component`, () => {
    it('renders a registration form by default', () => {
      const wrapper = shallow(<RegistrationForm />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
});