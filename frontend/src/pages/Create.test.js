import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Create from './Create'
import { Button } from '@material-ui/core'
import { configure, shallow } from 'enzyme'

configure({ adapter: new Adapter() })
describe('<Create />', () => {
  const wrapper = shallow(<Create />)
  it('should have four buttons in the first page of step form', () => {
    expect(wrapper.find(Button).length).toBe(4)
    expect(wrapper.find(Button).at(0).text()).toEqual('An entire place')
    expect(wrapper.find(Button).at(1).text()).toEqual('A private room')
    expect(wrapper.find(Button).at(2).text()).toEqual('A shared room')
  })
  it('should show alert message if user donot choose any type of property and click next button', () => {
    const setShowAlert = jest.fn()
    const props = { setShowAlert }
    const wrapper = shallow(<Create {...props} />)
    const nextBtn = wrapper.find(Button).at(3)
    nextBtn.simulate('click')
    expect(setShowAlert).toHaveBeenCalledTimes(1)
    // expect(wrapper.find(Button).length).toBe(2)
  })
  it('should go to the next page if user click one property type', () => {
    const wrapper = shallow(<Create />)
    const oneProperty = wrapper.find(Button).at(0)
    const mockedEvent = { currentTarget: { name: 'entirePlace' } }
    oneProperty.simulate('click', mockedEvent)
    const nextBtn = wrapper.find(Button).at(3)
    nextBtn.simulate('click')
    expect(wrapper.find(Button).length).toBe(2)
  })
})
