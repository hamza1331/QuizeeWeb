import reducer from './reducer'
import aboutReducer from './aboutReducer'
import { combineReducers } from "redux";

export default combineReducers({
    rootReducer:reducer,
    aboutReducer
})