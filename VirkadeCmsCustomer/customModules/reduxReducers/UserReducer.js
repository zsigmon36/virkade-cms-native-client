import { defaultState } from '../../static/reduxDefault'

export default function userReducer(state = defaultState, action){
    let newState = Object.assign({}, state);
    switch (action.type){
        case 'UPDATE_USER':
            newState[Object.keys(action.user)[0]] = action.user[Object.keys(action.user)[0]];
            return newState;
        default:
            return state;
        } 
}