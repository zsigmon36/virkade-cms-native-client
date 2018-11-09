const defaultState = {
            username:"",
            password:"",
            securityQ:"",
            securityA:""
}

export default function basicAccountReducer(state = defaultState, action){
    let newState = Object.assign({}, state);
    switch (action.type){
        case 'UPDATE_BASIC_ACCOUNT':
            newState[Object.keys(action.basicAccount)[0]] = action.basicAccount[Object.keys(action.basicAccount)[0]];
            return newState;
        default:
            return state;
        } 
}