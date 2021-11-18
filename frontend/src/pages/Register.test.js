import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Register from './Register'
import { Typography, Button } from '@material-ui/core';

configure({ adapter: new Adapter() })
describe('Register', () => {
  const wrapper = shallow(<Register />)
  it('Should have a slogan on the top of page', () => {
    expect(wrapper.find(Typography).at(0).text()).toEqual('Sign up')
  })
  it('Should have a sign up button in this component', () => {
    expect(wrapper.find(Button).text()).toEqual('Sign Up')
  })
})
