
export const filterMax = (filterFlights) => {
    return filterFlights.sort((a, b) => +a.flight.price.total.amount > +b.flight.price.total.amount ? -1 : 1)
  }

export const filterMin = (filterFlights) => {
  return filterFlights.sort((a, b) => +a.flight.price.total.amount > +b.flight.price.total.amount ? 1 : -1)
}

const getMillisecond = (obj) => {
    const lengthArr = (obj.flight.legs[0].segments).length
    const timeInPath = +(new Date(obj.flight.legs[0].segments[lengthArr - 1].arrivalDate)) - +(new Date(obj.flight.legs[0].segments[0].departureDate))
    return timeInPath
}

export const filterTimeMin = (filterFlights) => {
  return filterFlights.sort((a, b) => {
    const timeInPathA = getMillisecond(a)
    const timeInPathB = getMillisecond(b)
    if (timeInPathA < timeInPathB) {
        return -1
    } 
    if (timeInPathA > timeInPathB)
    {
        return 1
    }
    return 0
  })
}

export const getTime = (obj) => {
    const lengthArr = (obj.flight.legs[0].segments)?.length
    const timeInPath = +(new Date(obj.flight.legs[0].segments[lengthArr - 1].arrivalDate)) - +(new Date(obj.flight.legs[0].segments[0].departureDate)) 
    const getHours = Math.floor((timeInPath / (1000 * 60 * 60)) % 24)
    const getMinute = Math.floor((timeInPath / (1000 * 60)) % 60)
    return {timeInPath, getHours, getMinute}
}

//=================================================================================================

// export const filterOneSit = (filterFlights) => {
//     return filterFlights.filter((flight) => (flight.flight.legs[0].segments).length === 2)
// }

// export const filterNoneSit = (filterFlights) => {
//     return filterFlights.filter((flight) => (flight.flight.legs[0].segments).length === 1)
// }

// export const filterCost = (filterFlights, min, max) => {
//     return filterFlights.filter((flight) => flight.flight.price.total.amount > +min && flight.flight.price.total.amount < +max)
// }


