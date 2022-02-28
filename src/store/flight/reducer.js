import { FILTER_SORT_ACTION, INIT_ALL_FLIGHTS_ACTION } from "./constants"

const initialState = {
    allFlights: [],
    filterFlights: [],
}

export const flightReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_ALL_FLIGHTS_ACTION:
            return {
                ...state,
                allFlights: [...action.payload],
                filterFlights: [...action.payload]
            }
        case FILTER_SORT_ACTION:
            return {
                ...state,
                filterFlights: [...action.payload]
            }
        default: 
            return state
    }
}