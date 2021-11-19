import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import SearchRes from './SearchRes'
import { Typography, Card } from '@material-ui/core'
import { configure, shallow } from 'enzyme'

configure({ adapter: new Adapter() })
describe('<SearchRes />', () => {
  const propsOne = {
    searchResList: [
      {
        title: 'test1',
        thumbnail: '',
        address: '',
        metadata: { bedRooms: [] },
        reviews: [],
        availability: [],
      },
    ],
  }
  const propsTwo = {
    searchResList: [
      {
        title: 'test1',
        thumbnail: '',
        address: '',
        metadata: { bedRooms: [] },
        reviews: [],
        availability: [],
      },
      {
        title: 'test2',
        thumbnail: '',
        address: '',
        metadata: { bedRooms: [] },
        reviews: [],
        availability: []
      },
    ],
  }
  const wrapperOne = shallow(<SearchRes {...propsOne} />)
  const wrapperTwo = shallow(<SearchRes {...propsTwo} />)
  it('should have a search slogan an the top of page', () => {
    const typo = wrapperOne.find(Typography).at(0)
    expect(typo.length).toEqual(1)
    expect(typo.text()).toEqual('Search result')
  })
  it('should have one card if the result list contains one result', () => {
    const cards = wrapperOne.find(Card)
    expect(cards.length).toBe(1)
  })
  it('should have muitiple cards if the result list contains multiple results', () => {
    const cards = wrapperTwo.find(Card)
    expect(cards.length).toBe(2)
  })
})
