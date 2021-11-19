import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Register from './Register'
import { Typography, Button } from '@material-ui/core';

configure({ adapter: new Adapter() })
describe('Register', () => {
  const wrapper = shallow(<Register />)
  it('match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Should have a slogan on the top of page', () => {
    expect(wrapper.find(Typography).at(0).text()).toEqual('Sign up')
  })
  it('Should have one button in this page', () => {
    expect(wrapper.find(Button).length).toBe(1)
  })
  it('Should have a sign up button in this component', () => {
    expect(wrapper.find(Button).text()).toEqual('Sign Up')
  })
  it('should test input value', () => {
    wrapper.find('#firstName').simulate('change', { target: { value: 'testFirst' } })
    expect(wrapper.find('#firstName').props().value).toEqual('testFirst')
    wrapper.find('#lastName').simulate('change', { target: { value: 'testLast' } })
    expect(wrapper.find('#firstName').props().value).toEqual('testFirst')
    wrapper.find('#email').simulate('change', { target: { value: 'test@test.com' } })
    expect(wrapper.find('#email').props().value).toEqual('test@test.com')
    wrapper.find('#password').simulate('change', { target: { value: 'testpassword' } })
    expect(wrapper.find('#password').props().value).toEqual('testpassword')
  })
})
