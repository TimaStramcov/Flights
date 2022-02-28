import { initAllFlightsAction } from "../flight/action"

export const initAllFlights = () => {
    return dispatch => {
        fetch('http://localhost:3000/result')
            .then(res => res.json())
            .then(json => dispatch(initAllFlightsAction(json)))
            .catch(err => console.log(err))
    }
}