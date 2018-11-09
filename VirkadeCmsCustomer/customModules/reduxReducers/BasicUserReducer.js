const defaultState = {
        firstName:"",
        lastName:"",
        emailAddress:""
    }

export default function basicUserReducer(state = defaultState, action){
    let newState = Object.assign({}, state);
    switch (action.type){
        case 'UPDATE_BASIC_USER':
            newState[Object.keys(action.basicUser)[0]] = action.basicUser[Object.keys(action.basicUser)[0]];
            return newState;
        default:
            return state;
        } 
}