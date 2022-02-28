import React from 'react'
import './Flights.scss'
import Filter from '../../components/filter/Filter.jsx'
import FlightList from '../../components/flightList/FlightList'

function Flights() {

  return (
    <div className="flights">
      <Filter/>
      <FlightList/>
    </div>
  )
}

export default Flights