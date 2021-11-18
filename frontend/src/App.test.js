import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import APP from './App'
import Navbar from './components/Navbar'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Create from './pages/Create'
import Hosted from './pages/Hosted'
import Edit from './pages/Edit'
import Listing from './pages/Listing'
import Requests from './pages/Requests'
import Review from './pages/Review'
import TotalProfit from './pages/TotalProfit'
import UploadFile from './pages/UploadFile'

configure({ adapter: new Adapter() });
const wrapper = shallow(<APP />);
let pathMap = {};
beforeAll(() => {
  const component = shallow(<APP/>);
  pathMap = component.find(Route).reduce((pathMap, route) => {
    const routeProps = route.props();
    pathMap[routeProps.path] = routeProps.children.type;
    return pathMap;
  }, {});
})
describe('<TotalProfit />', () => {
  it('Should has a Navbar', () => {
    expect(wrapper.find(Navbar).length).toBe(1);
  });
  it('Should has a Switch function', () => {
    expect(wrapper.find(Switch).length).toBe(1);
  });
  it('Should has 11 different Route', () => {
    expect(wrapper.find(Route).length).toBe(12);
  });
  it('should show Home component for / router', () => {
    expect(pathMap['/']).toEqual(Home);
  })
  it('should show register component for /register router', () => {
    expect(pathMap['/register']).toEqual(Register);
  })
  it('should show login component for /login router', () => {
    expect(pathMap['/login']).toEqual(Login);
  })
  it('should show create component for /create router', () => {
    expect(pathMap['/create']).toEqual(Create);
  })
  it('should show hosted component for /hosted router', () => {
    expect(pathMap['/hosted']).toEqual(Hosted);
  })
  it('should show edit component for /edit/:id router', () => {
    expect(pathMap['/edit/:id']).toEqual(Edit);
  })
  it('should show listing component for /listings/:id router', () => {
    expect(pathMap['/listings/:id']).toEqual(Listing);
  })
  it('should show requets component for /requests/:listingId router', () => {
    expect(pathMap['/requests/:listingId']).toEqual(Requests);
  })
  it('should show review component for /review/:id/:listID router', () => {
    expect(pathMap['/review/:id/:listID']).toEqual(Review);
  })
  it('should show profit component for /profit router', () => {
    expect(pathMap['/profit']).toEqual(TotalProfit);
  })
  it('should show uploadfile component for /uploadfile router', () => {
    expect(pathMap['/uploadfile']).toEqual(UploadFile);
  })
})
