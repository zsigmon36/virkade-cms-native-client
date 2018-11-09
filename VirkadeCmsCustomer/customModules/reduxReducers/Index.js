import {combineReducers} from 'redux';
import basicUserReducer from './BasicUserReducer';
import basicAccountReducer from './BasicAccountReducer';

const rootReducer = combineReducers({
    basicAccount:basicAccountReducer,
    basicUser:basicUserReducer,
})

export default rootReducer