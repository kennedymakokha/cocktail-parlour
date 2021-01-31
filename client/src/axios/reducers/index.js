import { combineReducers } from 'redux';

import cocktailReducer from './cocktails';



export default combineReducers({
    cocktailsData: cocktailReducer,

});