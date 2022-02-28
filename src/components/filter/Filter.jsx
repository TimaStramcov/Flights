import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterSortAction } from '../../store/flight/action'
import { flightSelector } from '../../store/flight/selector'
import { uid } from '../../utils/uid'
import { validationInput } from '../../utils/validationInput'
import { filterMax, filterMin, filterTimeMin } from './filter.js'
import './Filter.scss'

const Filter = () => {
  const dispatch = useDispatch()
  const { allFlights, filterFlights } = useSelector(flightSelector)
  const checked = useRef()
  const [fromCost, setFromCost] = useState(0)
  const [toCost, setToCost] = useState(999999)
  const [filterObj, setFilterObj] = useState({legs: [], price: {min: 0, max: 999999}, nameCompany: []})

  const listCompanies = [...new Set(allFlights.map(company => company.flight.carrier.caption))]

  const filterNameCompany = (e, nameCompany) => {
    e.target.checked ? setFilterObj({...filterObj, nameCompany: [...filterObj.nameCompany, nameCompany]}) : setFilterObj({...filterObj, nameCompany: [...filterObj.nameCompany.filter(comp => comp !== nameCompany)]})
  }
  const filterLegs = (e, countLegs) => {
    e.target.checked ? setFilterObj({...filterObj, legs: [...filterObj.legs, countLegs]}) : setFilterObj({...filterObj, legs: [...filterObj.legs.filter(leg => leg !== countLegs)]})
  }

  useEffect(() => {
    setFilterObj({...filterObj, price: {min: +fromCost, max: +toCost}})
  }, [fromCost, toCost])

  const newResultFilter = () => {
    let newFilter = []

    if (filterObj.nameCompany.length > 0) {
      newFilter.push(...allFlights.filter(company => filterObj.nameCompany.indexOf(company.flight.carrier.caption) !== -1))
    }
    if (filterObj.legs.length > 0) {
      const resArr = (newFilter.length === 0 ? allFlights : newFilter).filter(flight => {
        if (filterObj.legs.length > 1) {
          return (flight.flight.legs[0].segments).length === 1 || (flight.flight.legs[0].segments).length === 2  ? true : false
        } else {
          return (flight.flight.legs[0].segments).length === filterObj.legs[0] ? true : false
        }
      })
      newFilter.push(...resArr)
    }
    if (newFilter.length > 0) {
      const filterCost = newFilter.filter((flight) => flight.flight.price.total.amount > filterObj.price.min && flight.flight.price.total.amount < filterObj.price.max)
      dispatch(filterSortAction(filterCost))
    } else {
      const filterCost = allFlights.filter((flight) => flight.flight.price.total.amount > filterObj.price.min && flight.flight.price.total.amount < filterObj.price.max)
      dispatch(filterSortAction(filterCost))
    }
  }


  useEffect(() => {
    newResultFilter()
  }, [filterObj])

  return (
    <section className='filter'>
      <div className='filter__sort'>
        <form action="#">
          <h3>Сортировка</h3>
          <div>
            <input id='sort-max-btn' name='sort' type="radio" onClick={() => dispatch(filterSortAction(filterMin(filterFlights)))}/>
            <label htmlFor="sort-max-btn">- по возрастанию</label>
          </div>
          <div>
            <input id='sort-min-btn' name='sort' type="radio" onClick={() => dispatch(filterSortAction(filterMax(filterFlights)))}/>
            <label htmlFor="sort-min-btn">- по убыванию</label>
          </div>
          <div>
            <input id='sort-time-btn' name='sort' type="radio" onClick={() => dispatch(filterSortAction(filterTimeMin(filterFlights)))}/>
            <label htmlFor="sort-time-btn">- по времени пути</label>
          </div>
        </form>
      </div>
      <div className='filter__filter-items'>
        <form action="#">
          <h3>Фильтровать</h3>
          <div>
            <input id='filter-btn-one-sit' type="checkbox" name='change-legs' checked={filterObj.legs.indexOf(2) !== -1 ? true : false} onChange={e => filterLegs(e, 2)}/>
            <label htmlFor="filter-items-btn">- 1 пересадка</label>
          </div>
          <div>
            <input id='filter-btn-none-sit' type="checkbox" name='change-legs' checked={filterObj.legs.indexOf(1) !== -1 ? true : false} onChange={e => filterLegs(e, 1)}/>
            <label htmlFor="filter-btn-none-sit">- без пересадок</label>
          </div>
        </form>
      </div>
      <div className='filter__cost'>
        <form action="#">
          <h3>Цена</h3>
          <div>
            <label htmlFor="cost-from">От</label>
            <input id='cost-from' type="text" value={fromCost} onChange={(e) => validationInput(e.target.value, setFromCost)}/>
          </div>
          <div>
            <label htmlFor="cost-to">До</label>
            <input id='cost-to' type="text" value={toCost} onChange={(e) => validationInput(e.target.value, setToCost)}/>
          </div>
          {/* <button style={{margin: '0 auto', width: '100%'}} onClick={() => newResultFilter()}><h4>Применить</h4></button> */}
        </form>
      </div>
      <div className='filter__company'>
        <form action="#">
          <h3>Авиакомпании</h3>
          <ul ref={checked}>
          { 
            (filterFlights ? listCompanies : []).map(company => (
              <li key={uid()}>
                <input id='company-check' checked={filterObj.nameCompany.indexOf(company) !== -1 ? true : false} type="checkbox" onChange={e => filterNameCompany(e, company)}/>
                <label htmlFor="company-check">{company}</label>
              </li>
            ))
          }
          </ul>
        </form>
      </div>
    </section>
  )
}

export default Filter