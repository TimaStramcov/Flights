import React, { useEffect, useState } from 'react'
import './FlightList.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initAllFlights } from '../../store/asyncAction/flights'
import { flightSelector } from '../../store/flight/selector'
import { uid } from '../../utils/uid'
import { getTime } from '../filter/filter'
import { calendar } from './dateList'

function FlightList() {
    const dispatch = useDispatch()
    useEffect(() => dispatch(initAllFlights()), [])
    const { filterFlights } = useSelector(flightSelector)
    const [count, setCount] = useState(10)
    const visualArr = []

    for(let i = 0; i < count; i++) {
      visualArr.push(filterFlights[i])
    }

    const gDate = (flight) => {
      const nDate = new Date(flight)
      return {hours: nDate.getHours(), minutes: nDate.getMinutes(), date: nDate.getDate(), month: nDate.getMonth(), day: nDate.getDay(),}
    }

    const getLenghtThere = (elem) => {
      return (elem.flight.legs[0].segments).length - 1
    }
    const getLenghtBack = (elem) => {
      return (elem.flight.legs[1].segments).length - 1
    }
      
  return (
    <div className='flight-list'>
        <ul>
          {
            filterFlights.length !== 0
            ?
            visualArr.map(flight => (
              <li key={uid()} className='flight-list__item'>
                <div className='flight-list__item-header'>
                    <h3>{flight?.flight.price.total.amount} {flight?.flight.price.total.currencyCode}</h3>
                    <p>Стоимость для одного пассажира</p>
                </div>
                <section className='flight-list__item-body'>
                  <div className='flight-list__item-info'>
                    <div className='flight-list__item-path'>
                      {flight?.flight.legs[0].segments[0].departureCity.caption}, {flight?.flight.legs[0].segments[0].departureAirport.caption } 
                      <span> ({flight?.flight.legs[0].segments[0].departureAirport.uid}) &rarr; </span>
                      {flight?.flight.legs[1].segments[0].departureCity.caption}, {flight?.flight.legs[1].segments[0].departureAirport.caption } 
                      <span> ({flight?.flight.legs[1].segments[0].departureAirport.uid})</span>
                    </div>
                    <div className='flight-list__item-date'>
                      <div>
                        {gDate(flight.flight.legs[0].segments[0].departureDate).hours} : {gDate(flight.flight.legs[0].segments[0].departureDate).minutes} 
                        <span> {gDate(flight.flight.legs[0].segments[0].departureDate).date} {calendar.month[gDate(flight.flight.legs[0].segments[0].departureDate).month]}. {calendar.day[gDate(flight.flight.legs[0].segments[0].departureDate).day]} </span>
                      </div>
                      <div className='flight-list__item-travel-time'>
                        {flight ? getTime(flight).getHours : ''} ч : {flight ? getTime(flight).getMinute : ''} мин
                      </div>
                      <div>
                        {gDate(flight.flight.legs[0].segments[getLenghtThere(flight)].arrivalDate).hours} : {gDate(flight.flight.legs[0].segments[getLenghtThere(flight)].arrivalDate).minutes} 
                        <span> {gDate(flight.flight.legs[0].segments[getLenghtThere(flight)].arrivalDate).date} {calendar.month[gDate(flight.flight.legs[0].segments[getLenghtThere(flight)].arrivalDate).month]}. {calendar.day[gDate(flight.flight.legs[0].segments[getLenghtThere(flight)].arrivalDate).day]} </span>
                      </div>
                    </div>
                    {
                      flight ? (flight.flight.legs[0].segments).length - 1 === 0 ? '' 
                        : 
                        <div className='flight-list__item-legs'>
                          <div className='line' />
                          <p>{(flight.flight.legs[0].segments).length - 1} пересадка</p>
                          <div className='line' />
                        </div>
                        : ''
                    }
                  </div>
                  <p>Рейс выполняет: {flight.flight.carrier.caption}</p>
                </section>
                <hr />
                {/* ============================================================================================= */}
                <section className='flight-list__item-body'>
                  <div className='flight-list__item-info'>
                    <div className='flight-list__item-path'>
                      {flight?.flight.legs[1].segments[0].departureCity.caption}, {flight?.flight.legs[1].segments[0].departureAirport.caption } 
                      <span> ({flight?.flight.legs[1].segments[0].departureAirport.uid}) &rarr; </span>
                      {flight?.flight.legs[1].segments[getLenghtBack(flight)].arrivalCity.caption}, {flight?.flight.legs[1].segments[getLenghtBack(flight)].arrivalAirport.caption } 
                      <span> ({flight?.flight.legs[1].segments[getLenghtBack(flight)].arrivalAirport.uid})</span>
                    </div>
                    <div className='flight-list__item-date'>
                      <div>
                        {gDate(flight.flight.legs[1].segments[0].departureDate).hours} : {gDate(flight.flight.legs[1].segments[0].departureDate).minutes}
                        <span> {gDate(flight.flight.legs[1].segments[0].departureDate).date} {calendar.month[gDate(flight.flight.legs[1].segments[0].departureDate).month]}. {calendar.day[gDate(flight.flight.legs[1].segments[0].departureDate).day]}</span>
                      </div>
                      <div className='flight-list__item-travel-time'>
                        {flight ? getTime(flight).getHours : ''} ч : {flight ? getTime(flight).getMinute : ''} мин
                      </div>
                      <div>
                        {gDate(flight.flight.legs[1].segments[getLenghtBack(flight)].arrivalDate).hours} : {gDate(flight.flight.legs[1].segments[getLenghtBack(flight)].arrivalDate).minutes}
                        <span> {gDate(flight.flight.legs[1].segments[getLenghtBack(flight)].arrivalDate).date} {calendar.month[gDate(flight.flight.legs[1].segments[getLenghtBack(flight)].arrivalDate).month]}. {calendar.day[gDate(flight.flight.legs[1].segments[getLenghtBack(flight)].arrivalDate).day]} </span>
                      </div>
                    </div>
                    {
                      flight ? (flight.flight.legs[1].segments).length - 1 === 0 ? '' 
                        : 
                        <div className='flight-list__item-legs'>
                          <div className='line' />
                          <p>{(flight.flight.legs[1].segments).length - 1} пересадка</p>
                          <div className='line' />
                        </div>
                        : ''
                    }
                  </div>
                  <p>Рейс выполняет: {flight.flight.carrier.caption}</p>
                </section>
                <button className='add-btn-flight'>Добавить</button>
              </li>
          ))
          :
          'None'
          }
          <li><button className='show-more-btn' onClick={() => setCount(count + 10)}>Показать еще</button></li>
        </ul>
    </div>
  )
}

export default FlightList