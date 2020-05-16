import {combineReducers} from 'redux';
import basicUserReducer from './BasicUserReducer';
import basicAccountReducer from './BasicAccountReducer';
import personalUserReducer from './PersonalUserReducer';

const rootReducer = combineReducers({
    basicAccount:basicAccountReducer,
    basicUser:basicUserReducer,
    personalUser:personalUserReducer,
})

export default rootReducer