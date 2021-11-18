import React from 'react';
import { shallow, configure } from 'enzyme';
import Login from './Login'
import Adapter from 'enzyme-adapter-react-16';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

configure({ adapter: new Adapter() });
describe('<Login />', () => {
  const wrapper = shallow(<Login />);
  const textFieldMUI = wrapper.find(TextField);

  it('Should have a slogan on the top of page', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.find(Typography).at(0).text()).toEqual('Sign in')
  })

  it('Has a login button', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.containsMatchingElement(<Button type="submit">Sign In</Button>)).toEqual(true);
  });
  it('TextField component should exists.', () => {
    expect(textFieldMUI.exists()).toEqual(true)
  });
  it('Should render two <TextField /> to type the email and password', () => {
    expect(wrapper.find(TextField).length).toBe(2);
  });
  it('Should has a email TextField', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.containsMatchingElement(<TextField name='email'/>)).toEqual(true);
  });
  it('Should has a password TextField', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.containsMatchingElement(<TextField type='password'/>)).toEqual(true);
  });
});
