const PORT_NUMBER = '5005'
const BACKEND_URL = `http://localhost:${PORT_NUMBER}`
const initData = {
  title: '',
  address: { street: '', city: '', state: '', postcode: '', country: '' },
  price: '',
  thumbnail: '',
  metadata: {
    entirePlace: false,
    privateRoom: false,
    shareRoom: false,
    bedsNumber: '',
    bedRoomNumber: '',
    bathRoomNumber: '',
    pool: false,
    BBQ: false,
    parking: false,
    airCondition: false,
    wifi: false,
    TV: false,
    kitchen: false,
    hotTub: false,
  },
}
export { BACKEND_URL, initData }
