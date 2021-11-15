import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import fetchFunc from '../services/fetchService'
import { Bar } from 'react-chartjs-2';

const dailyProfit = [];
for (let i = 0; i < 30; i++) {
  dailyProfit.push([]);
}

const changeSecocndToDate = (second) => {
  const date = new Date(second)
  const year = date.getFullYear()
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return `${month}/${day}/${year}`
}
const todaySecondsStyle = new Date(changeSecocndToDate(Date.now())).getTime();
const thirtyDaysAgoSecondsStyle = todaySecondsStyle - 2505600000;

function TotalProfit (props) {
  const [profit, setProfit] = useState([]);
  const { currentUser } = props
  const currentuUserEmail = currentUser.email;
  const listingID = []
  const [validListingID, setvalidListingID] = useState([]);
  useEffect(() => {
    fetchFunc('/listings', 'GET').then((response) => {
      if (response.status !== 200) {
        return
      }
      response.json().then((data) => {
        console.log(data);
        for (let i = 0; i < data.listings.length; i++) {
          if (data.listings[i].owner === currentuUserEmail) {
            listingID.push(data.listings[i].id);
          }
        }
        setvalidListingID(listingID);
      })
    })
  }, [])
  console.log(validListingID);
  useEffect(() => {
    fetchFunc('/bookings', 'GET').then((response) => {
      if (response.status !== 200) {
        return
      }
      response.json().then((data) => {
        for (let i = 0; i < data.bookings.length; i++) {
          if (listingID.includes(parseInt(data.bookings[i].listingId)) && data.bookings[i].status === 'accepted' && data.bookings[i].dateRange.start <= todaySecondsStyle) {
            const today = new Date(changeSecocndToDate(Date.now()));
            const secondGap = data.bookings[i].dateRange.end - data.bookings[i].dateRange.start;
            const days = Math.floor(secondGap / (24 * 3600 * 1000)) + 1;
            const oneDayPrice = Math.floor(data.bookings[i].totalPrice / days);
            if (data.bookings[i].dateRange.end > todaySecondsStyle && data.bookings[i].dateRange.start < todaySecondsStyle) {
              const endDay = new Date(changeSecocndToDate(Date.now()));
              const startDay = new Date(changeSecocndToDate(data.bookings[i].dateRange.start));
              const gapBetweenToday = (endDay.getTime() - startDay.getTime()) / (1000 * 3600 * 24);
              for (let i = dailyProfit.length - 1 - gapBetweenToday; i < dailyProfit.length; i++) {
                dailyProfit[i].push(oneDayPrice);
              }
            } else if (data.bookings[i].dateRange.start < thirtyDaysAgoSecondsStyle && data.bookings[i].dateRange.end > thirtyDaysAgoSecondsStyle) {
              const gapBetweenToday = (todaySecondsStyle - data.bookings[i].dateRange.end) / (1000 * 3600 * 24);
              for (let i = 0; i < dailyProfit.length - 1 - gapBetweenToday; i++) {
                dailyProfit[i].push(oneDayPrice);
              }
            } else {
              const endDay = new Date(changeSecocndToDate(data.bookings[i].dateRange.end));
              const DifferenceInTime = today.getTime() - endDay.getTime();
              const gapBetweenBookings = (data.bookings[i].dateRange.end - data.bookings[i].dateRange.start) / (1000 * 3600 * 24);
              const gapBetweenToday = DifferenceInTime / (1000 * 3600 * 24);
              for (let i = dailyProfit.length - 1 - gapBetweenToday - gapBetweenBookings; i <= dailyProfit.length - 1 - gapBetweenToday; i++) {
                dailyProfit[i].push(oneDayPrice);
              }
            }
          }
        }
        setProfit(dailyProfit);
      })
    })
  }, [])
  const dataOfGraph = []
  for (let i = 0; i < profit.length; i++) {
    const sum = profit[i].reduce((partialSum, a) => partialSum + a, 0);
    dataOfGraph.push(sum);
  }
  console.log(dataOfGraph);
  const state = {
    labels: ['day1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    datasets: [
      {
        label: 'Profit for the past month',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: dataOfGraph
      }
    ]
  }
  return (
    <div style={{ marginTop: 100, width: '80%' }}>
      <Bar
        data={state}
        ptions={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  )
}

export default TotalProfit

TotalProfit.propTypes = {
  currentUser: PropTypes.any,
}
