import { FILTER_SORT_ACTION, INIT_ALL_FLIGHTS_ACTION } from "./constants";

export const initAllFlightsAction = (result) => ({
    type: INIT_ALL_FLIGHTS_ACTION,
    payload: result.flights
})

export const filterSortAction = (filterArr) => ({
    type: FILTER_SORT_ACTION,
    payload: filterArr
})