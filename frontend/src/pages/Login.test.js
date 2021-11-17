import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Login from './Login'
import Adapter from 'enzyme-adapter-react-16';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

configure({adapter: new Adapter()});
describe('<Login />', () => {
  const wrapper = shallow(<Login />);
  const textFieldMUI = wrapper.find(TextField);
  it('Has a login button', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.containsMatchingElement(<Button type="submit">Sign In</Button>)).to.be.true;
  });
  it('Another way for testing login button', () => {
    wrapper.find({children: "Sign In"})
  });
  it('TextField component should exists.', () => {
    expect(textFieldMUI).to.exist;
  });
  it('Should render two <TextField /> to type the email and password', () => {
    expect(wrapper.find(TextField)).to.have.lengthOf(2);
  });
  it('Should has a email TextField', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.containsMatchingElement(<TextField name='email'/>)).to.be.true;
  });
  it('Should has a password TextField', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.containsMatchingElement(<TextField type='password'/>)).to.be.true;
  });
  it('Should get email and password by user input correctly', () => {
    const email = 'xincheng@gmail.com';
    const password = 'Cx1111111';
    const wrapper = shallow(<Login handleSubmit={state => {
      expect(state.email).to.be.equal(email);
      expect(state.password).to.be.equal(password);
    }}/>);
    wrapper.find(Button).simulate('click');
  });
});
