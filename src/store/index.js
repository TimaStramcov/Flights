import { applyMiddleware, combineReducers, createStore } from 'redux'
import { flightReducer } from './flight/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    flight: flightReducer,
})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))